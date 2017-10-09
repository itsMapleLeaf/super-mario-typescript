import { Camera } from './Camera'
import { Entity } from './Entity'
import { Level } from './Level'
import { SpriteSheet } from './SpriteSheet'

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
  const { tiles } = level
  const { tileResolver } = level.tileCollider

  const buffer = document.createElement('canvas')
  buffer.width = 256 + 16
  buffer.height = 240

  const context = buffer.getContext('2d')!

  let startIndex: number
  let endIndex: number

  function drawTiles(drawFrom: number, drawTo: number) {
    if (drawFrom === startIndex && drawTo === endIndex) return
    startIndex = drawFrom
    endIndex = drawTo

    console.log('redrawing')

    for (let x = startIndex; x <= endIndex; x++) {
      const col = tiles.grid[x]
      if (col) {
        col.forEach((tile, y) => {
          sprites.drawTile(tile.name, context, x - startIndex, y)
        })
      }
    }
  }

  return function drawBackgroundLayer(
    context: CanvasRenderingContext2D,
    camera: Camera,
  ) {
    const drawWidth = tileResolver.toIndex(camera.size.x)
    const drawFrom = tileResolver.toIndex(camera.pos.x)
    const drawTo = drawFrom + drawWidth
    drawTiles(drawFrom, drawTo)

    context.drawImage(
      buffer,
      -camera.pos.x % 16,
      -camera.pos.y
    )
  }
}

export function createSpriteLayer(
  entities: Set<Entity>,
  width = 64,
  height = 64,
) {
  const spriteBuffer = document.createElement('canvas')
  spriteBuffer.width = width
  spriteBuffer.height = height

  const spriteBufferContext = spriteBuffer.getContext('2d')!

  return function drawSpriteLayer(
    context: CanvasRenderingContext2D,
    camera: Camera,
  ) {
    entities.forEach(entity => {
      spriteBufferContext.clearRect(0, 0, width, height)

      entity.draw(spriteBufferContext)

      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y,
      )
    })
  }
}

export function createCollisionLayer(level: Level) {
  const tileResolver = level.tileCollider.tileResolver
  const tileSize = tileResolver.tileSize
  const resolvedTiles = [] as Array<{ x: number; y: number }>

  const getByIndexOriginal = tileResolver.getByIndex

  tileResolver.getByIndex = function getByIndexFake(x: number, y: number) {
    resolvedTiles.push({ x, y })
    return getByIndexOriginal.call(tileResolver, x, y)
  }

  return function drawCollision(
    context: CanvasRenderingContext2D,
    camera: Camera,
  ) {
    context.strokeStyle = 'blue'

    resolvedTiles.forEach(({ x, y }) => {
      context.strokeRect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize,
      )
    })

    level.entities.forEach(entity => {
      context.strokeRect(
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y,
        entity.size.x,
        entity.size.y,
      )
    })

    resolvedTiles.splice(0)
  }
}

export function createCameraLayer(cameraToDraw: Camera) {
  return function drawCameraRect(context: CanvasRenderingContext2D, fromCamera: Camera) {
    context.strokeStyle = 'purple'
    context.strokeRect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y
    )
  }
}

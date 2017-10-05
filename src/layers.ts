import { Entity } from './Entity'
import { Level } from './Level'
import { SpriteSheet } from './SpriteSheet'

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
  const buffer = document.createElement('canvas')
  buffer.width = 256
  buffer.height = 240

  const context = buffer.getContext('2d')!

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y)
  })

  return function drawBackgroundLayer(context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0)
  }
}

export function createSpriteLayer(entities: Set<Entity>) {
  return function drawSpriteLayer(context: CanvasRenderingContext2D) {
    entities.forEach(entity => {
      entity.draw(context)
    })
  }
}

export function createCollisionLayer(level: Level) {
  const tileResolver = level.tileCollider.tiles
  const tileSize = tileResolver.tileSize
  const resolvedTiles = [] as Array<{ x: number; y: number }>

  const getByIndexOriginal = tileResolver.getByIndex

  tileResolver.getByIndex = function getByIndexFake(x: number, y: number) {
    resolvedTiles.push({ x, y })
    return getByIndexOriginal.call(tileResolver, x, y)
  }

  return function drawCollision(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'blue'

    resolvedTiles.forEach(({ x, y }) => {
      context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize)
    })

    level.entities.forEach(({ pos, size }) => {
      context.strokeRect(pos.x, pos.y, size.x, size.y)
    })

    resolvedTiles.splice(0)
  }
}

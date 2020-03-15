import { Camera } from '../Camera'
import { Level } from '../Level'
import { SpriteSheet } from '../SpriteSheet'
import { TileResolver, TileResolverMatrix } from '../TileResolver'

export function createBackgroundLayer(
  level: Level,
  tiles: TileResolverMatrix,
  sprites: SpriteSheet,
) {
  const tileResolver = new TileResolver(tiles)

  const buffer = document.createElement('canvas')
  buffer.width = 256 + 16
  buffer.height = 240

  const context = buffer.getContext('2d')!

  function drawTiles(startIndex: number, endIndex: number) {
    context.clearRect(0, 0, buffer.width, buffer.height)

    for (let x = startIndex; x <= endIndex; x++) {
      // TODO: iterate over tiles instead of accessing grid
      const col = tiles.grid[x]
      if (col) {
        for (const [y, tile] of col.entries()) {
          if (!tile || !tile.name) continue

          if (sprites.animations.has(tile.name)) {
            sprites.drawAnimation(
              tile.name,
              context,
              x - startIndex,
              y,
              level.totalTime,
            )
          } else {
            sprites.drawTile(tile.name, context, x - startIndex, y)
          }
        }
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

    context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y)
  }
}

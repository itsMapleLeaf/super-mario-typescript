import { Level } from '../Level'
import { Font } from '../loaders/font'
import { findPlayers } from '../player'
import { raise } from '../raise'
import { Player } from '../traits/Player'

function getPlayer(level: Level) {
  for (const entity of findPlayers(level.entities)) {
    if (entity.getTrait(Player)) return entity
  }
  throw new Error('player not found')
}

export function createPlayerProgressLayer(font: Font, level: Level) {
  const size = font.size

  const spriteBuffer = document.createElement('canvas')
  spriteBuffer.width = 32
  spriteBuffer.height = 32

  const spriteBufferContext =
    spriteBuffer.getContext('2d') || raise('Canvas not supported')

  return function drawPlayerProgress(context: CanvasRenderingContext2D) {
    const entity = getPlayer(level)
    font.print(`WORLD ${level.name}`, context, size * 12, size * 12)

    spriteBufferContext.clearRect(0, 0, spriteBuffer.width, spriteBuffer.height)
    entity.draw(spriteBufferContext)
    context.drawImage(spriteBuffer, size * 12, size * 15)

    const lifeCount = String(entity.getTrait(Player)?.lives).padStart(2, ' ')
    font.print(`x ${lifeCount}`, context, size * 16, size * 16)
  }
}

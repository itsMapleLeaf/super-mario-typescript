import { Level } from '../Level'
import { Font } from '../loaders/font'
import { findPlayers } from '../player'
import { LevelTimer } from '../traits/LevelTimer'
import { Player } from '../traits/Player'

function getPlayerTrait(level: Level) {
  for (const entity of findPlayers(level)) {
    const trait = entity.getTrait(Player)
    if (trait) return trait
  }
  throw new Error('player not found')
}

function getTimerTrait(level: Level) {
  for (const entity of level.entities) {
    const trait = entity.getTrait(LevelTimer)
    if (trait) return trait
  }
  throw new Error('timer not found')
}

export function createDashboardLayer(font: Font, level: Level) {
  const line1 = font.size
  const line2 = font.size * 2

  const playerTrait = getPlayerTrait(level)
  const timerTrait = getTimerTrait(level)

  return function drawDashboard(context: CanvasRenderingContext2D) {
    font.print(playerTrait.name, context, 16, line1)
    font.print(String(playerTrait.score).padStart(6, '0'), context, 16, line2)

    font.print(
      '@x' + String(playerTrait.coins).padStart(2, '0'),
      context,
      96,
      line2,
    )

    font.print('WORLD', context, 152, line1)
    font.print('1-1', context, 160, line2)

    font.print('TIME', context, 208, line1)
    font.print(
      String(Math.floor(timerTrait.currentTime)).padStart(3, '0'),
      context,
      216,
      line2,
    )
  }
}

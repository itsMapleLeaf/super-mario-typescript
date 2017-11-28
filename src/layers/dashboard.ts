import { Entity } from '../Entity'
import { Font } from '../loaders/font'
import { PlayerController } from '../traits/PlayerController'

export function createDashboardLayer(font: Font, playerEnv: Entity) {
  const line1 = font.size
  const line2 = font.size * 2

  const coins = 13

  return function drawDashboard(context: CanvasRenderingContext2D) {
    const { time, score } = playerEnv.getTrait(PlayerController)!

    font.print('MARIO', context, 16, line1)
    font.print(String(score).padStart(6, '0'), context, 16, line2)

    font.print('@x' + String(coins).padStart(2, '0'), context, 96, line2)

    font.print('WORLD', context, 152, line1)
    font.print('1-1', context, 160, line2)

    font.print('TIME', context, 208, line1)
    font.print(String(Math.floor(time)).padStart(3, '0'), context, 216, line2)
  }
}

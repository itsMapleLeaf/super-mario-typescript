import { loadEntities } from './entities'
import { Mario } from './entities/Mario'
import { setupGamepad, setupKeyboard } from './input'
import { createCollisionLayer } from './layers/collision'
import { createDashboardLayer } from './layers/dashboard'
import { loadFont } from './loaders/font'
import { createLevelLoader } from './loaders/level'
import { createPlayer, createPlayerEnv } from './player'
import { Timer } from './Timer'
import { Player } from './traits/Player'
import { GameContext } from './types'

async function main(canvas: HTMLCanvasElement) {
  const videoContext = canvas.getContext('2d')!
  videoContext.imageSmoothingEnabled = false

  const audioContext = new AudioContext()

  const [entityFactory, font] = await Promise.all([
    loadEntities(audioContext),
    loadFont(),
  ])

  const loadLevel = createLevelLoader(entityFactory)
  const level = await loadLevel('1-2')

  const mario = createPlayer(entityFactory.mario!()) as Mario
  mario.useTrait(Player, (player) => {
    player.name = 'MARIO'
  })
  mario.pos.set(64, 64)
  level.entities.add(mario)

  const playerEnv = createPlayerEnv(mario)
  level.entities.add(playerEnv)

  const router = setupKeyboard(window)
  router.addReceiver(mario)

  const checkGamepadInput = setupGamepad(mario)

  const timer = new Timer()

  level.comp.layers.push(createCollisionLayer(level))
  level.comp.layers.push(createDashboardLayer(font, level))

  timer.update = function update(deltaTime) {
    if (!document.hasFocus()) return

    const gameContext: GameContext = {
      deltaTime,
      audioContext,
      entityFactory,
      videoContext,
    }

    level.update(gameContext)
    checkGamepadInput()

    level.draw(gameContext)
  }

  timer.start()
}

const canvas = document.getElementById('screen')
if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error)
} else {
  console.warn('Canvas not found')
}

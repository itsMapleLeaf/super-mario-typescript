import { CompositionScene } from './CompositionScene'
import { loadEntities } from './entities'
import { Mario } from './entities/Mario'
import { Entity } from './Entity'
import { GameContext } from './GameContext'
import { setupKeyboard } from './input'
import { createCollisionLayer } from './layers/collision'
import { createColorLayer } from './layers/color'
import { createDashboardLayer } from './layers/dashboard'
import { createPlayerProgressLayer } from './layers/player-progress'
import { Level } from './Level'
import { loadFont } from './loaders/font'
import { createLevelLoader } from './loaders/level'
import { LevelSpecTrigger } from './loaders/types'
import { createPlayer, createPlayerEnv } from './player'
import { SceneRunner } from './SceneRunner'
import { Timer } from './Timer'
import { Player } from './traits/Player'

async function main(canvas: HTMLCanvasElement) {
  const videoContext = canvas.getContext('2d')!
  videoContext.imageSmoothingEnabled = false

  const audioContext = new AudioContext()

  const [entityFactory, font] = await Promise.all([
    loadEntities(audioContext),
    loadFont(),
  ])

  const loadLevel = createLevelLoader(entityFactory)

  const sceneRunner = new SceneRunner()

  const mario = createPlayer(entityFactory.mario!()) as Mario
  mario.useTrait(Player, (player) => {
    player.name = 'MARIO'
  })

  const inputRouter = setupKeyboard(window)
  inputRouter.addReceiver(mario)

  async function runLevel(name: string) {
    const level = await loadLevel(name)

    level.events.listen(
      Level.EVENT_TRIGGER,
      (spec: LevelSpecTrigger, trigger: Entity, touches: Set<Entity>) => {
        if (spec.type === 'goto') {
          for (const entity of touches) {
            if (entity.getTrait(Player)) {
              runLevel(spec.name)
              return
            }
          }
        }
      },
    )

    const playerProgressLayer = createPlayerProgressLayer(font, level)
    const dashboardLayer = createDashboardLayer(font, level)

    mario.pos.set(0, 0)
    level.entities.add(mario)

    const playerEnv = createPlayerEnv(mario)
    level.entities.add(playerEnv)

    const waitScreen = new CompositionScene()
    waitScreen.comp.layers.push(createColorLayer('black'))
    waitScreen.comp.layers.push(dashboardLayer)
    waitScreen.comp.layers.push(playerProgressLayer)
    sceneRunner.addScene(waitScreen)

    level.comp.layers.push(createCollisionLayer(level))
    level.comp.layers.push(dashboardLayer)
    sceneRunner.addScene(level)

    sceneRunner.runNext()
  }

  const timer = new Timer()

  timer.update = function update(deltaTime) {
    if (!document.hasFocus()) return

    const gameContext: GameContext = {
      deltaTime,
      audioContext,
      entityFactory,
      videoContext,
    }

    sceneRunner.update(gameContext)
  }

  timer.start()
  runLevel('debug-progression')
}

const canvas = document.getElementById('screen')
if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error)
} else {
  console.warn('Canvas not found')
}

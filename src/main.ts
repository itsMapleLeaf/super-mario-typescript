import { Camera } from './Camera'
import { loadEntities } from './entities'
import { Mario } from './entities/Mario'
import { Entity } from './Entity'
import { setupGamepad, setupKeyboard } from './input'
import { createLevelLoader } from './loaders/level'
import { Timer } from './Timer'
import { PlayerController } from './traits/PlayerController'

function createPlayerEnv(playerEntity: Entity) {
  const playerEnv = new Entity()
  const playerControl = new PlayerController()
  playerControl.checkpoint.set(64, 64)
  playerControl.setPlayer(playerEntity)
  playerEnv.addTrait(playerControl)
  return playerEnv
}

async function main(canvas: HTMLCanvasElement) {
  const entityFactory = await loadEntities()
  const loadLevel = createLevelLoader(entityFactory)
  const level = await loadLevel('1-1')

  const context = canvas.getContext('2d')!
  context.imageSmoothingEnabled = false
  context.mozImageSmoothingEnabled = false
  context.webkitImageSmoothingEnabled = false

  const camera = new Camera()

  const mario = entityFactory.mario() as Mario
  mario.pos.set(64, 64)
  level.entities.add(mario)

  const playerEnv = createPlayerEnv(mario)
  level.entities.add(playerEnv)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  const checkGamepadInput = setupGamepad(mario)

  const timer = new Timer()

  timer.update = function update(deltaTime) {
    level.update(deltaTime)

    camera.pos.x = Math.max(0, mario.pos.x - 100)

    checkGamepadInput()

    context.save()
    context.scale(3, 3)
    level.comp.draw(context, camera)
    context.restore()
  }

  timer.start()
}

const canvas = document.getElementById('screen')
if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error)
} else {
  console.warn('Canvas not found')
}

import { Camera } from './Camera'
import { loadEntities } from './entities'
import { Mario } from './entities/Mario'
import { setupGamepad, setupKeyboard } from './input'
import { createLevelLoader } from './loaders/level'
import { Timer } from './Timer'

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

  const goomba = entityFactory.goomba()
  goomba.pos.x = 220
  level.entities.add(goomba)

  const koopa = entityFactory.koopa()
  koopa.pos.x = 180
  level.entities.add(koopa)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  const checkGamepadInput = setupGamepad(mario)

  const timer = new Timer()

  timer.update = function update(deltaTime) {
    level.update(deltaTime)

    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100
    }

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

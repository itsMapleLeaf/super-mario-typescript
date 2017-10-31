import { Camera } from './Camera'
import { loadEntities } from './entities'
import { setupGamepad, setupKeyboard } from './input'
import { loadLevel } from './loaders/level'
import { Timer } from './Timer'

async function main() {
  const [entities, level] = await Promise.all([loadEntities(), loadLevel('1-1')])

  const canvas = document.getElementById('screen') as HTMLCanvasElement
  const context = canvas.getContext('2d')!
  context.imageSmoothingEnabled = false
  context.mozImageSmoothingEnabled = false
  context.webkitImageSmoothingEnabled = false

  const camera = new Camera()

  const mario = entities.createMario()
  mario.pos.set(64, 64)
  level.entities.add(mario)

  const goomba = entities.createGoomba()
  goomba.pos.x = 220
  level.entities.add(goomba)

  const koopa = entities.createKoopa()
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

main().catch(console.error)

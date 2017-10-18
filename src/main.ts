import { Camera } from './Camera'
import { createMario } from './entities'
import { setupKeyboard } from './input'
import { loadLevel } from './loaders'
import { Timer } from './Timer'

async function main() {
  const canvas = document.getElementById('screen') as HTMLCanvasElement
  const context = canvas.getContext('2d')!

  const [mario, level] = await Promise.all([createMario(), loadLevel('1-1')])

  const camera = new Camera()

  // initialize mario
  mario.pos.set(64, 64)

  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  // start game loop
  const timer = new Timer()

  timer.update = function update(deltaTime) {
    level.update(deltaTime)

    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100
    }

    level.comp.draw(context, camera)
  }

  timer.start()
}

main().catch(console.error)

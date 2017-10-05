import { loadLevel } from './loaders'
import { createMario } from './entities'
import { Timer } from './Timer'
import { createCollisionLayer } from './layers'
import { setupKeyboard } from './input'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d')!

context.imageSmoothingEnabled = false

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
  // initialize mario
  mario.pos.set(64, 64)

  level.comp.layers.push(createCollisionLayer(level))

  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  // start game loop
  const timer = new Timer()

  timer.update = function update(deltaTime) {
    level.update(deltaTime)
    level.comp.draw(context)
  }

  timer.start()
})

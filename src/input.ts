import { Entity } from './Entity'
import { Keyboard } from './Keyboard'
import { Go } from './traits/Go'
import { Jump } from './traits/Jump'

export function setupKeyboard(mario: Entity) {
  const input = new Keyboard()

  input.addMapping('Space', pressed => {
    const jump = mario.getTrait<Jump>('jump')!
    if (pressed) {
      jump.start()
    } else {
      jump.cancel()
    }
  })

  input.addMapping('ArrowRight', keyState => {
    const go = mario.getTrait<Go>('go')!
    go.dir = keyState
  })

  input.addMapping('ArrowLeft', keyState => {
    const go = mario.getTrait<Go>('go')!
    go.dir = -keyState
  })

  return input
}

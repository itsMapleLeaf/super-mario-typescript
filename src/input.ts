import { Entity } from './Entity'
import { Keyboard } from './Keyboard'
import { Go } from './traits/Go'
import { Jump } from './traits/Jump'

export function setupKeyboard(mario: Entity) {
  const input = new Keyboard()
  let leftMovement = 0
  let rightMovement = 0

  input.addListener('Space', pressed => {
    const jump = mario.getTrait<Jump>('jump')!
    if (pressed) {
      jump.start()
    } else {
      jump.cancel()
    }
  })

  input.addListener('ArrowRight', keyState => {
    const go = mario.getTrait<Go>('go')!
    rightMovement = keyState
    go.dir = rightMovement + leftMovement
  })

  input.addListener('ArrowLeft', keyState => {
    const go = mario.getTrait<Go>('go')!
    leftMovement = -keyState
    go.dir = rightMovement + leftMovement
  })

  return input
}

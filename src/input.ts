import { Entity } from './Entity'
import { Keyboard } from './Keyboard'
import { Go } from './traits/Go'
import { Jump } from './traits/Jump'

export function setupKeyboard(mario: Entity) {
  const input = new Keyboard()

  function doJump(pressed: number) {
    const jump = mario.getTrait<Jump>('jump')!
    if (pressed) {
      jump.start()
    } else {
      jump.cancel()
    }
  }

  function moveRight(keyState: number) {
    const go = mario.getTrait<Go>('go')!
    go.dir += keyState === 1 ? 1 : -1
  }

  function moveLeft(keyState: number) {
    const go = mario.getTrait<Go>('go')!
    go.dir += keyState === 1 ? -1 : 1
  }

  input.addListener('KeyP', doJump)
  input.addListener('KeyD', moveRight)
  input.addListener('KeyA', moveLeft)

  return input
}

import { Mario } from './entities/Mario'
import { Keyboard } from './Keyboard'

export function setupKeyboard(mario: Mario) {
  const input = new Keyboard()

  function doJump(pressed: number) {
    if (pressed) {
      mario.jump.start()
    } else {
      mario.jump.cancel()
    }
  }

  function moveRight(keyState: number) {
    mario.go.dir += keyState === 1 ? 1 : -1
  }

  function moveLeft(keyState: number) {
    mario.go.dir += keyState === 1 ? -1 : 1
  }

  function run(keyState: number) {
    mario.turbo(keyState === 1)
  }

  input.addListener('KeyD', moveRight)
  input.addListener('KeyA', moveLeft)
  input.addListener('KeyP', doJump)
  input.addListener('KeyO', run)

  return input
}

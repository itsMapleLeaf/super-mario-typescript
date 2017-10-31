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
    mario.setTurboState(keyState === 1)
  }

  input.addListener('KeyD', moveRight)
  input.addListener('KeyA', moveLeft)
  input.addListener('KeyP', doJump)
  input.addListener('KeyO', run)

  return input
}

export function setupGamepad(mario: Mario) {
  return function checkGamepadInput() {
    const gamepad = navigator.getGamepads()[0]

    if (gamepad) {
      let movementAxis = gamepad.axes[0]
      const jumping = gamepad.buttons[0].pressed || gamepad.buttons[1].pressed
      const running = gamepad.buttons[2].pressed || gamepad.buttons[3].pressed

      // factor in deadzone
      if (Math.abs(movementAxis) < 0.5) {
        movementAxis = 0
      }

      if (jumping) {
        mario.jump.start()
      } else {
        mario.jump.cancel()
      }

      mario.go.dir = movementAxis
      mario.setTurboState(running)
    }
  }
}

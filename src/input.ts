import { Mario } from './entities/Mario'
import { Keyboard } from './Keyboard'

export function setupKeyboard(mario: Mario) {
  const input = new Keyboard()

  let leftState = 0
  let rightState = 0

  input.addListener('ArrowRight', keyState => {
    rightState = keyState
    mario.go.dir = rightState - leftState
  })

  input.addListener('ArrowLeft', keyState => {
    leftState = keyState
    mario.go.dir = rightState - leftState
  })

  input.addListener('ArrowUp', pressed => {
    if (pressed) {
      mario.jump.start()
    } else {
      mario.jump.cancel()
    }
  })

  input.addListener('KeyZ', keyState => {
    mario.setTurboState(keyState === 1)
  })

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

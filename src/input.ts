import { Mario } from './entities/Mario'
import { InputRouter } from './InputRouter'
import { Keyboard } from './Keyboard'

export function setupKeyboard(target: EventTarget) {
  const input = new Keyboard()
  const router = new InputRouter<Mario>()

  let leftState = 0
  let rightState = 0

  input.listenTo(target)

  input.addListener('ArrowRight', (keyState) => {
    rightState = keyState
    router.route((entity) => (entity.go.dir = rightState - leftState))
  })

  input.addListener('ArrowLeft', (keyState) => {
    leftState = keyState
    router.route((entity) => (entity.go.dir = rightState - leftState))
  })

  input.addListener('KeyZ', (pressed) => {
    if (pressed) {
      router.route((entity) => entity.jump.start())
    } else {
      router.route((entity) => entity.jump.cancel())
    }
  })

  input.addListener('KeyX', (keyState) => {
    router.route((entity) => entity.setTurboState(keyState === 1))
  })

  return router
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

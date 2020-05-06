import { Mario } from './entities/Mario'
import { Entity } from './Entity'
import { InputRouter } from './InputRouter'
import { Keyboard } from './Keyboard'
import { Go } from './traits/Go'
import { Jump } from './traits/Jump'

export function setupKeyboard(target: EventTarget) {
  const input = new Keyboard()
  const router = new InputRouter<Entity>()

  let leftState = 0
  let rightState = 0

  input.listenTo(target)

  input.addListener('ArrowRight', (keyState) => {
    rightState = keyState
    router.route((entity) => {
      entity.useTrait(Go, (go) => {
        go.dir = rightState - leftState
      })
    })
  })

  input.addListener('ArrowLeft', (keyState) => {
    leftState = keyState
    router.route((entity) => {
      entity.useTrait(Go, (go) => {
        go.dir = rightState - leftState
      })
    })
  })

  input.addListener('KeyZ', (pressed) => {
    if (pressed) {
      router.route((entity) => {
        entity.useTrait(Jump, (jump) => jump.start())
      })
    } else {
      router.route((entity) => {
        entity.useTrait(Jump, (jump) => jump.cancel())
      })
    }
  })

  input.addListener('KeyX', (keyState) => {
    router.route((entity) => {
      // the turbo should probably be a separate trait
      if (entity instanceof Mario) {
        entity.setTurboState(keyState === 1)
      }
    })
  })

  return router
}

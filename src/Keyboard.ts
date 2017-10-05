export type KeyCallback = (keyState: number) => void

export class Keyboard {
  /** current pressed state per key */
  keyStates = new Map<string, number>()

  /** callback functions per keycode */
  keyMap = new Map<string, KeyCallback>()

  addMapping(code: string, callback: KeyCallback) {
    this.keyMap.set(code, callback)
  }

  handleEvent(event: KeyboardEvent) {
    const { code } = event

    if (!this.keyMap.has(code)) {
      return // did not have key mapped, do nothing
    }

    event.preventDefault()

    const keyState = event.type === 'keydown' ? 1 : 0

    if (this.keyStates.get(code) === keyState) {
      return
    }

    this.keyStates.set(code, keyState)

    const callback = this.keyMap.get(code)
    if (callback) callback(keyState)
  }

  listenTo(target: EventTarget) {
    ;['keydown', 'keyup'].forEach(eventName => {
      target.addEventListener(eventName, event => {
        this.handleEvent(event as KeyboardEvent)
      })
    })
  }
}

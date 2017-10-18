export type KeyListener = (keyState: number) => void

export class Keyboard {
  /** current pressed state per key */
  keyStates = new Map<string, number>()

  /** callback functions per keycode */
  keyListeners = new Map<string, KeyListener>()

  addListener(code: string, callback: KeyListener) {
    this.keyListeners.set(code, callback)
    this.keyStates.set(code, 0)
  }

  listenTo(target: EventTarget) {
    const keyEvents = ['keydown', 'keyup']
    keyEvents.forEach(eventName => {
      target.addEventListener(eventName, event => {
        this.handleEvent(event as KeyboardEvent)
      })
    })
  }

  private handleEvent(event: KeyboardEvent) {
    if (event.repeat) return

    const listener = this.keyListeners.get(event.code)
    const keyState = event.type === 'keydown' ? 1 : 0
    if (listener) {
      this.keyStates.set(event.code, keyState)
      listener(keyState)
      event.preventDefault()
    }
  }
}

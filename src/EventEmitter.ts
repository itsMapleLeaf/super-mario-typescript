type Callback = (...args: any[]) => void
type Listener = { name: string; callback: Callback }

export class EventEmitter {
  private listeners: Listener[] = []

  listen(name: string, callback: Callback) {
    this.listeners.push({ name, callback })
  }

  emit(name: string, ...args: any[]) {
    this.listeners
      .filter(it => it.name === name)
      .forEach(it => it.callback(...args))
  }
}

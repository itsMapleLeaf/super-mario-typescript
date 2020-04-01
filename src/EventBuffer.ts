type Event = { name: string | symbol; args: any[] }

export class EventBuffer {
  private events: Event[] = []

  emit(name: string | symbol, ...args: any[]) {
    this.events.push({ name, args })
  }

  process(name: string | symbol, callback: (...args: any[]) => void) {
    for (const event of this.events) {
      if (event.name === name) {
        callback(...event.args)
      }
    }
  }

  clear() {
    this.events.length = 0
  }
}

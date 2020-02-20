export class AudioBoard {
  private buffers = new Map()

  constructor(private context: AudioContext) {}

  add(name: string, buffer: AudioBuffer) {
    this.buffers.set(name, buffer)
  }

  play(name: string) {
    const source = this.context.createBufferSource()
    source.connect(this.context.destination)
    source.buffer = this.buffers.get(name)
    source.start(0)
  }
}

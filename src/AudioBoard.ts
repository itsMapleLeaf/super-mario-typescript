export class AudioBoard {
  private buffers = new Map()

  add(name: string, buffer: AudioBuffer) {
    this.buffers.set(name, buffer)
  }

  play(name: string, context: AudioContext) {
    const source = context.createBufferSource()
    source.connect(context.destination)
    source.buffer = this.buffers.get(name)
    source.start(0)
  }
}

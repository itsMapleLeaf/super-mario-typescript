export class Timer {
  private accumulatedTime = 0
  private lastTime = 0

  constructor(private deltaTime = 1 / 60) { }

  update = (dt: number) => { }

  start() {
    this.enqueue()
  }

  private enqueue() {
    requestAnimationFrame(this.updateProxy)
  }

  private updateProxy = (time: number) => {
    this.accumulatedTime += (time - this.lastTime) / 1000

    while (this.accumulatedTime > this.deltaTime) {
      this.update(this.deltaTime)
      this.accumulatedTime -= this.deltaTime
    }

    this.enqueue()

    this.lastTime = time
  }
}

import { createAnimation } from '../animation'
import { Entity } from '../Entity'
import { SpriteSheet } from '../SpriteSheet'
import { Go } from '../traits/Go'
import { Jump } from '../traits/Jump'

export class Mario extends Entity {
  jump = new Jump()
  go = new Go()

  runAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 5)

  constructor(private sprites: SpriteSheet) {
    super()
    this.size.set(14, 16)

    this.addTrait(this.jump)
    this.addTrait(this.go)
  }

  resolveAnimationFrame() {
    if (this.go.dir !== 0) {
      return this.runAnimation(this.go.distance)
    }
    return 'idle'
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprites.draw(
      this.resolveAnimationFrame(),
      context,
      0,
      0,
      this.go.heading < 0,
    )
  }
}

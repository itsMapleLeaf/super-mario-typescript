import { Animation } from '../animation'
import { Entity } from '../Entity'
import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../SpriteSheet'
import { Go } from '../traits/Go'
import { Jump } from '../traits/Jump'

const FAST_DRAG = 1 / 5000
const SLOW_DRAG = 1 / 1000

export class Mario extends Entity {
  jump = new Jump()
  go = new Go()

  constructor(private sprites: SpriteSheet, private runAnimation: Animation) {
    super()

    this.size.set(14, 16)

    this.addTrait(this.jump)
    this.addTrait(this.go)

    this.go.dragFactor = SLOW_DRAG

    this.setTurboState(false)
  }

  resolveAnimationFrame() {
    if (this.jump.falling) {
      return 'jump'
    }

    if (this.go.distance > 0) {
      if ((this.vel.x > 0 && this.go.dir < 0) || (this.vel.x < 0 && this.go.dir > 0)) {
        return 'brake'
      }

      return this.runAnimation(this.go.distance)
    }
    return 'idle'
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprites.draw(this.resolveAnimationFrame(), context, 0, 0, this.go.heading < 0)
  }

  setTurboState(turboState: boolean) {
    this.go.dragFactor = turboState ? FAST_DRAG : SLOW_DRAG
  }
}

export async function loadMario() {
  const marioSprites = await loadSpriteSheet('mario')
  const runAnimation = marioSprites.getAnimation('run')

  return function createMario() {
    return new Mario(marioSprites, runAnimation)
  }
}

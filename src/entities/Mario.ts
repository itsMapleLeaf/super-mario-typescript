import { Animation } from '../animation'
import { AudioBoard } from '../AudioBoard'
import { Entity } from '../Entity'
import { loadAudioBoard } from '../loaders/audio'
import { loadSpriteSheet } from '../loaders/sprite'
import { SpriteSheet } from '../SpriteSheet'
import { Go } from '../traits/Go'
import { Jump } from '../traits/Jump'
import { Killable } from '../traits/Killable'
import { Physics } from '../traits/Physics'
import { Solid } from '../traits/Solid'
import { Stomper } from '../traits/Stomper'

const FAST_DRAG = 1 / 5000
const SLOW_DRAG = 1 / 1000

export class Mario extends Entity {
  jump = this.addTrait(new Jump())
  go = this.addTrait(new Go())
  stomper = this.addTrait(new Stomper())
  killable = this.addTrait(new Killable())
  solid = this.addTrait(new Solid())
  physics = this.addTrait(new Physics())

  constructor(
    private sprites: SpriteSheet,
    public audio: AudioBoard,
    private runAnimation: Animation,
  ) {
    super()

    this.size.set(14, 16)

    this.go.dragFactor = SLOW_DRAG
    this.killable.removeAfter = 0

    this.setTurboState(false)
  }

  resolveAnimationFrame() {
    if (this.jump.falling) {
      return 'jump'
    }

    if (this.go.distance > 0) {
      if (
        (this.vel.x > 0 && this.go.dir < 0) ||
        (this.vel.x < 0 && this.go.dir > 0)
      ) {
        return 'brake'
      }

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

  setTurboState(turboState: boolean) {
    this.go.dragFactor = turboState ? FAST_DRAG : SLOW_DRAG
  }
}

export async function loadMario(audioContext: AudioContext) {
  const [marioSprites, audioBoard] = await Promise.all([
    loadSpriteSheet('mario'),
    loadAudioBoard('mario', audioContext),
  ])

  const runAnimation = marioSprites.getAnimation('run')

  return function createMario() {
    return new Mario(marioSprites, audioBoard, runAnimation)
  }
}

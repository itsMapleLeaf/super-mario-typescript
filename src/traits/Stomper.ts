import { Entity, Side, Trait } from '../Entity'
import { GameContext } from '../types'
import { Killable } from './Killable'

export class Stomper extends Trait {
  bounceSpeed = 400
  didStomp = false

  onStomp = (us: Entity, them: Entity) => {}

  bounce(us: Entity, them: Entity) {
    us.bounds.bottom = them.bounds.top
    us.vel.y = -this.bounceSpeed
  }

  collides(us: Entity, them: Entity) {
    const killable = them.getTrait(Killable)
    if (!killable || killable.dead) {
      return
    }

    if (us.vel.y > them.vel.y) {
      this.bounce(us, them)
      this.didStomp = true
      this.onStomp(us, them)
    }
  }

  obstruct(ent: Entity, side: Side) {}

  update(entity: Entity, { audioContext }: GameContext) {
    if (this.didStomp) {
      entity.audio?.play('stomp', audioContext)
      this.didStomp = false
    }
  }
}

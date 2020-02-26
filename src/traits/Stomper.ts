import { Entity, Trait } from '../Entity'
import { Killable } from './Killable'

export class Stomper extends Trait {
  bounceSpeed = 400

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
      this.sounds.add('stomp')
      this.events.emit('stomp', us, them)
    }
  }
}

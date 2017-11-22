import { Entity, Side, Trait } from '../Entity'
import { Killable } from './Killable'

export class Stomper extends Trait {
  bounceSpeed = 400

  constructor() {
    super('stomper')
  }

  bounce(us: Entity, them: Entity) {
    us.bounds.bottom = them.bounds.top
    us.vel.y = -this.bounceSpeed
  }

  collides(us: Entity, them: Entity) {
    if (them.getTrait(Killable) && us.vel.y > them.vel.y) {
      this.bounce(us, them)
    }
  }

  obstruct(ent: Entity, side: Side) {}
}

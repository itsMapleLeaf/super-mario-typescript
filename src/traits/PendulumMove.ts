import { Entity, Side } from '../Entity'
import { Trait } from '../Trait'

export class PendulumMove extends Trait {
  speed = -30
  enabled = true

  update(ent: Entity) {
    if (this.enabled) {
      ent.vel.x = this.speed
    }
  }

  obstruct(ent: Entity, side: Side) {
    if (side === Side.left) {
      this.speed = Math.abs(this.speed)
    } else if (side === Side.right) {
      this.speed = -Math.abs(this.speed)
    }
  }
}

import { Entity, Side, Trait } from '../Entity'

export class PendulumWalk extends Trait {
  speed = -30

  constructor() {
    super('pendulumWalk')
  }

  update(ent: Entity, deltaTime: number) {
    ent.vel.x = this.speed
  }

  obstruct(ent: Entity, side: Side) {
    if (side === Side.left) {
      this.speed = Math.abs(this.speed)
    } else if (side === Side.right) {
      this.speed = -Math.abs(this.speed)
    }
  }
}

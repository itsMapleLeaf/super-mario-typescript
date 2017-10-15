import { Entity, Trait } from '../Entity'

export class Go extends Trait {
  dir = 0
  speed = 6000
  distance = 0
  heading = 1

  constructor() {
    super('go')
  }

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed * this.dir * deltaTime

    if (this.dir !== 0) {
      this.heading = this.dir
      this.distance += Math.abs(entity.vel.x * deltaTime)
    } else {
      this.distance = 0
    }
  }
}

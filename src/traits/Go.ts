import { Entity, Trait } from '../Entity'

export class Go extends Trait {
  dir = 0
  speed = 6000

  constructor() {
    super('go')
  }

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed * this.dir * deltaTime
  }
}

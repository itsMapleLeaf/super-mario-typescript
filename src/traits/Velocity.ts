import { Entity, Trait } from '../Entity'
import { GameContext } from '../GameContext'

export class Velocity extends Trait {
  update(entity: Entity, { deltaTime }: GameContext) {
    entity.pos.x += entity.vel.x * deltaTime
    entity.pos.y += entity.vel.y * deltaTime
  }
}

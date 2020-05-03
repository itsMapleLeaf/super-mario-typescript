import { Entity, Trait } from '../Entity'
import { GameContext } from '../GameContext'
import { Level } from '../Level'

export class Gravity extends Trait {
  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    entity.vel.y += level.gravity * deltaTime
  }
}

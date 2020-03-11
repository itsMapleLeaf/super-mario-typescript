import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { GameContext } from '../types'

export class Gravity extends Trait {
  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    entity.vel.y += level.gravity * deltaTime
  }
}

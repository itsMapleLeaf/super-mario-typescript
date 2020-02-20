import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { GameContext } from '../types'

export class Physics extends Trait {
  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    entity.pos.x += entity.vel.x * deltaTime

    level.tileCollider.checkX(entity)

    entity.pos.y += entity.vel.y * deltaTime
    level.tileCollider.checkY(entity)

    entity.vel.y += level.gravity * deltaTime
  }
}

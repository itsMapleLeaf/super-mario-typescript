import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { GameContext } from '../types'

export class Physics extends Trait {
  update(entity: Entity, gameContext: GameContext, level: Level) {
    entity.pos.x += entity.vel.x * gameContext.deltaTime

    level.tileCollider.checkX(entity, gameContext, level)

    entity.pos.y += entity.vel.y * gameContext.deltaTime
    level.tileCollider.checkY(entity, gameContext, level)

    entity.vel.y += level.gravity * gameContext.deltaTime
  }
}

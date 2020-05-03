import { Entity } from './Entity'
import { GameContext } from './GameContext'
import { Level } from './Level'
import {
  TileResolver,
  TileResolverMatch,
  TileResolverMatrix,
} from './TileResolver'
import { brick } from './tiles/brick'
import { coin } from './tiles/coin'
import { ground } from './tiles/ground'
import { Dict } from './types'

export type TileColliderContext = {
  entity: Entity
  match: TileResolverMatch
  resolver: TileResolver
  gameContext: GameContext
  level: Level
}

export type TileColliderHandler = (context: TileColliderContext) => void

// this might be better typed as Dict<[TileColliderHandler, TileColliderHandler]>
const handlers: Dict<TileColliderHandler[]> = {
  ground,
  brick,
  coin,
}

export class TileCollider {
  resolvers: TileResolver[] = []

  addGrid(tileMatrix: TileResolverMatrix) {
    this.resolvers.push(new TileResolver(tileMatrix))
  }

  checkX(entity: Entity, gameContext: GameContext, level: Level) {
    let x
    if (entity.vel.x > 0) {
      x = entity.bounds.right
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left
    } else {
      return
    }

    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        x,
        x,
        entity.bounds.top,
        entity.bounds.bottom,
      )

      for (const match of matches) {
        this.handle(0, entity, match, resolver, gameContext, level)
      }
    }
  }

  checkY(entity: Entity, gameContext: GameContext, level: Level) {
    let y
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top
    } else {
      return
    }

    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        entity.bounds.left,
        entity.bounds.right,
        y,
        y,
      )

      for (const match of matches) {
        this.handle(1, entity, match, resolver, gameContext, level)
      }
    }
  }

  private handle(
    index: number,
    entity: Entity,
    match: TileResolverMatch,
    resolver: TileResolver,
    gameContext: GameContext,
    level: Level,
  ) {
    const tileCollisionContext: TileColliderContext = {
      entity,
      match,
      resolver,
      gameContext,
      level,
    }

    handlers[match.tile.type]?.[index]?.(tileCollisionContext)
  }
}

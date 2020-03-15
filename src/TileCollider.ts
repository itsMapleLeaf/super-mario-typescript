import { Entity } from './Entity'
import { CollisionTile } from './Level'
import { Matrix } from './math'
import { TileResolver, TileResolverMatch } from './TileResolver'
import { brick } from './tiles/brick'
import { ground } from './tiles/ground'
import { Dict } from './types'

export type TileColliderHandler = (
  entity: Entity,
  match: TileResolverMatch<CollisionTile>,
) => void

// this might be better typed as Dict<[TileColliderHandler, TileColliderHandler]>
const handlers: Dict<TileColliderHandler[]> = {
  ground,
  brick,
}

export class TileCollider {
  tiles = new TileResolver(this.tileMatrix)

  constructor(private tileMatrix: Matrix<CollisionTile>) {}

  checkX(entity: Entity) {
    let x
    if (entity.vel.x > 0) {
      x = entity.bounds.right
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left
    } else {
      return
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom,
    )

    for (const match of matches) {
      this.handle(0, entity, match)
    }
  }

  checkY(entity: Entity) {
    let y
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top
    } else {
      return
    }

    const matches = this.tiles.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y,
    )

    for (const match of matches) {
      this.handle(1, entity, match)
    }
  }

  private handle(
    index: number,
    entity: Entity,
    match: TileResolverMatch<CollisionTile>,
  ) {
    handlers[match.tile.type]?.[index]?.(entity, match)
  }
}

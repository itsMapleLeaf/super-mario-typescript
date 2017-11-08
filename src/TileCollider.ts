import { Entity, Side } from './Entity'
import { CollisionTile } from './Level'
import { Matrix } from './math'
import { TileResolver } from './TileResolver'

export class TileCollider {
  tileResolver = new TileResolver(this.tileMatrix)

  constructor(public tileMatrix: Matrix<CollisionTile>) {}

  checkX(entity: Entity) {
    let x
    if (entity.vel.x > 0) {
      x = entity.bounds.right
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left
    } else {
      return
    }

    const matches = this.tileResolver.searchByRange(x, x, entity.bounds.top, entity.bounds.bottom)

    for (const match of matches) {
      if (match.tile.type !== 'ground') {
        continue
      }

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.bounds.right = match.x1
          entity.vel.x = 0

          entity.obstruct(Side.right)
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2
          entity.vel.x = 0

          entity.obstruct(Side.left)
        }
      }
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

    const matches = this.tileResolver.searchByRange(entity.bounds.left, entity.bounds.right, y, y)

    for (const match of matches) {
      if (match.tile.type !== 'ground') {
        continue
      }

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.bounds.bottom = match.y1
          entity.vel.y = 0

          entity.obstruct(Side.bottom)
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2
          entity.vel.y = 0

          entity.obstruct(Side.top)
        }
      }
    }
  }
}

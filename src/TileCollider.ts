import { Entity } from './Entity'
import { LevelTile } from './Level'
import { Matrix } from './math'
import { TileResolver } from './TileResolver'

export class TileCollider {
  tileResolver = new TileResolver(this.tileMatrix)

  constructor(public tileMatrix: Matrix<LevelTile>) {}

  checkX(entity: Entity) {
    const { pos, size, vel } = entity

    let x
    if (vel.x > 0) {
      x = pos.x + size.x
    } else if (vel.x < 0) {
      x = pos.x
    } else {
      return
    }

    const matches = this.tileResolver.searchByRange(x, x, pos.y, pos.y + size.y)

    if (!matches) return

    matches.forEach(match => {
      if (match.tile.type !== 'ground') return

      if (vel.x > 0) {
        if (pos.x + size.x > match.x1) {
          pos.x = match.x1 - size.x
          vel.x = 0
        }
      } else if (vel.x < 0) {
        if (pos.x < match.x2) {
          pos.x = match.x2
          vel.x = 0
        }
      }
    })
  }

  checkY(entity: Entity) {
    const { pos, size, vel } = entity

    let y
    if (vel.y > 0) {
      y = pos.y + size.y
    } else if (vel.y < 0) {
      y = pos.y
    } else {
      return
    }

    const matches = this.tileResolver.searchByRange(pos.x, pos.x + size.x, y, y)

    if (!matches) return

    matches.forEach(match => {
      if (match.tile.type !== 'ground') return

      if (vel.y > 0) {
        if (pos.y + size.y > match.y1) {
          pos.y = match.y1 - size.y
          vel.y = 0
        }
      } else if (vel.y < 0) {
        if (pos.y < match.y2) {
          pos.y = match.y2
          vel.y = 0
        }
      }
    })
  }
}

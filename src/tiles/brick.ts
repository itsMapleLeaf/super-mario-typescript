import { Side } from '../Entity'
import { TileColliderHandler } from '../TileCollider'
import { Player } from '../traits/Player'

const handleX: TileColliderHandler = ({ entity, match }) => {
  if (entity.vel.x > 0) {
    if (entity.bounds.right > match.x1) {
      entity.obstruct(Side.right, match)
    }
  } else if (entity.vel.x < 0) {
    if (entity.bounds.left < match.x2) {
      entity.obstruct(Side.left, match)
    }
  }
}

const handleY: TileColliderHandler = ({
  entity,
  match,
  resolver,
  gameContext,
  level,
}) => {
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      entity.obstruct(Side.bottom, match)
    }
  } else if (entity.vel.y < 0) {
    if (entity.getTrait(Player)) {
      const grid = resolver.matrix
      grid.delete(match.indexX, match.indexY)

      const goomba = gameContext.entityFactory.goomba!()
      goomba.vel.set(50, -400)
      goomba.pos.set(entity.pos.x, match.y1)
      level.entities.add(goomba)
    }

    if (entity.bounds.top < match.y2) {
      entity.obstruct(Side.top, match)
    }
  }
}

export const brick = [handleX, handleY]

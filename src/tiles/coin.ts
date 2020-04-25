import { TileColliderHandler } from '../TileCollider'
import { Player } from '../traits/Player'

const handle: TileColliderHandler = ({ entity, match, resolver }) => {
  const player = entity.getTrait(Player)
  if (player) {
    resolver.matrix.delete(match.indexX, match.indexY)
    player.addCoins(1)
  }
}

export const coin = [handle, handle]

import { Compositor } from './Compositor'
import { Entity } from './Entity'
import { Matrix } from './math'
import { TileCollider } from './TileCollider'

export type LevelTile = {
  name: string
  type: string
}

export class Level {
  comp = new Compositor()
  entities = new Set<Entity>()
  tiles = new Matrix<LevelTile>()
  tileCollider = new TileCollider(this.tiles)

  gravity = 2000

  update(deltaTime: number) {
    this.entities.forEach(entity => {
      entity.update(deltaTime)

      entity.pos.x += entity.vel.x * deltaTime
      this.tileCollider.checkX(entity)

      entity.pos.y += entity.vel.y * deltaTime
      this.tileCollider.checkY(entity)

      entity.vel.y += this.gravity * deltaTime
    })
  }
}

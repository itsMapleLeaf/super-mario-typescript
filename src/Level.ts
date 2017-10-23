import { Compositor } from './Compositor'
import { Entity } from './Entity'
import { Matrix } from './math'
import { TileCollider } from './TileCollider'

export type CollisionTile = {
  type: string
}

export type BackgroundTile = {
  name: string
}

export class Level {
  comp = new Compositor()
  entities = new Set<Entity>()
  tileCollider: TileCollider

  gravity = 1500
  totalTime = 0

  setCollisionGrid(matrix: Matrix<CollisionTile>) {
    this.tileCollider = new TileCollider(matrix)
  }

  update(deltaTime: number) {
    this.entities.forEach(entity => {
      entity.update(deltaTime)

      entity.pos.x += entity.vel.x * deltaTime
      this.tileCollider.checkX(entity)

      entity.pos.y += entity.vel.y * deltaTime
      this.tileCollider.checkY(entity)

      entity.vel.y += this.gravity * deltaTime
    })

    this.totalTime += deltaTime
  }
}

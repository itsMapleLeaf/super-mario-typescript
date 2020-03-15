import { LevelSpecTile } from './loaders/types'
import { Matrix } from './math'

export type TileResolverMatch = {
  tile: LevelSpecTile
  x1: number
  x2: number
  y1: number
  y2: number
  indexX: number
  indexY: number
}

export type TileResolverMatrix = Matrix<LevelSpecTile>

export class TileResolver {
  constructor(public matrix: TileResolverMatrix, public tileSize = 16) {}

  toIndex(pos: number) {
    return Math.floor(pos / this.tileSize)
  }

  *toIndexRange(pos1: number, pos2: number) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize

    for (let pos = pos1; pos < pMax; pos += this.tileSize) {
      yield this.toIndex(pos)
    }
  }

  getByIndex(indexX: number, indexY: number): TileResolverMatch | undefined {
    const tile = this.matrix.get(indexX, indexY)
    if (tile) {
      const x1 = indexX * this.tileSize
      const x2 = (indexX + 1) * this.tileSize
      const y1 = indexY * this.tileSize
      const y2 = (indexY + 1) * this.tileSize
      return { tile, x1, x2, y1, y2, indexX, indexY }
    }
  }

  searchByPosition(posX: number, posY: number) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY))
  }

  *searchByRange(x1: number, x2: number, y1: number, y2: number) {
    for (const indexX of this.toIndexRange(x1, x2)) {
      for (const indexY of this.toIndexRange(y1, y2)) {
        const match = this.getByIndex(indexX, indexY)
        if (match) {
          yield match
        }
      }
    }
  }
}

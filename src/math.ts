export class Vec2 {
  constructor(public x = 0, public y = 0) {}

  set(x: number, y: number) {
    this.x = x
    this.y = y
  }

  copy(other: Vec2) {
    this.set(other.x, other.y)
  }
}

export class Matrix<T> {
  // TODO: implement iterator

  private grid: T[][] = []

  set(x: number, y: number, value: T) {
    if (!this.grid[x]) {
      this.grid[x] = []
    }
    this.grid[x][y] = value
  }

  get(x: number, y: number): T | undefined {
    const col = this.grid[x]
    if (col) return col[y]
  }

  delete(x: number, y: number) {
    const col = this.grid[x]
    if (col) delete col[y]
  }

  *itemsInRange(left: number, top: number, right: number, bottom: number) {
    for (let x = left; x <= right; x++) {
      for (let y = top; y <= bottom; y++) {
        const value = this.get(x, y)
        if (value) yield [value, x, y] as const
      }
    }
  }

  forEach(callback: (value: T, x: number, y: number) => void) {
    for (const [x, col] of this.grid.entries()) {
      for (const [y, value] of col.entries()) {
        callback(value, x, y)
      }
    }
  }
}

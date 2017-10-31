export class Vec2 {
  constructor(public x = 0, public y = 0) {}

  set(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class Matrix<T> {
  grid = [] as T[][]

  set(x: number, y: number, value: T) {
    if (!this.grid[x]) {
      this.grid[x] = []
    }
    this.grid[x][y] = value
  }

  get(x: number, y: number): T | void {
    const col = this.grid[x]
    if (col) return col[y]
  }

  forEach(callback: (value: T, x: number, y: number) => void) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y)
      })
    })
  }
}

export class SpriteSheet {
  tiles = new Map<string, HTMLCanvasElement>()

  constructor(
    public image: HTMLImageElement,
    public tileWidth: number,
    public tileHeight: number,
  ) { }

  define(name: string, x: number, y: number, width: number, height: number) {
    const buffer = document.createElement('canvas')

    buffer.width = width
    buffer.height = height

    buffer.getContext('2d')!.drawImage(
      this.image,
      x, y, width, height,
      0, 0, width, height,
    )

    this.tiles.set(name, buffer)
  }

  defineTile(name: string, x: number, y: number) {
    this.define(
      name,
      x * this.tileWidth,
      y * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
    )
  }

  draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name)
    if (!buffer) {
      throw new Error(`SpriteSheet.draw(): Sprite "${name}" not found`)
    }
    context.drawImage(buffer, x, y)
  }

  drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, context, x * this.tileWidth, y * this.tileHeight)
  }
}

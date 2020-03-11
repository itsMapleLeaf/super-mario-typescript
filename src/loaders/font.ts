import { loadImage } from '../loaders'
import { SpriteSheet } from '../SpriteSheet'

const characters =
  ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

export class Font {
  constructor(private sprites: SpriteSheet, public size: number) {}

  print(text: string, context: CanvasRenderingContext2D, x: number, y: number) {
    for (const [pos, char] of [...text].entries()) {
      this.sprites.draw(char, context, x + pos * this.size, y)
    }
  }
}

export async function loadFont() {
  const image = await loadImage('images/font.png')
  const fontSprite = new SpriteSheet(image, 8, 8)

  const size = 8
  const rowLen = image.width

  for (const [index, char] of [...characters].entries()) {
    const x = (index * size) % rowLen
    const y = Math.floor((index * size) / rowLen) * size
    fontSprite.define(char, x, y, size, size)
  }

  return new Font(fontSprite, 8)
}

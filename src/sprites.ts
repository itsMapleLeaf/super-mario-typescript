import { loadImage } from './loaders'
import { SpriteSheet } from './SpriteSheet'

export async function loadMarioSprite() {
  const image = await loadImage('/public/images/characters.gif')

  const sprites = new SpriteSheet(image, 16, 16)
  sprites.define('idle', 276, 44, 16, 16)

  return sprites
}

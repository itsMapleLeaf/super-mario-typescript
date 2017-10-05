import { loadImage } from './loaders'
import { SpriteSheet } from './SpriteSheet'

export function loadBackgroundSprites() {
  return loadImage('/public/images/tiles.png').then(image => {
    const sprites = new SpriteSheet(image, 16, 16)

    sprites.defineTile('ground', 0, 0)
    sprites.defineTile('sky', 3, 23)

    return sprites
  })
}

export function loadMarioSprite() {
  return loadImage('/public/images/characters.gif').then(image => {
    const sprites = new SpriteSheet(image, 16, 16)

    sprites.define('idle', 276, 44, 16, 16)

    return sprites
  })
}

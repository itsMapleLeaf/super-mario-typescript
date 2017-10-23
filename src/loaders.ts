import { createAnimation } from './animation'
import { SpriteSheetSpec } from './loaders/types'
import { SpriteSheet } from './SpriteSheet'

export function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => {
      resolve(image)
    })

    image.addEventListener('error', event => {
      reject(`Could not load image from ${url}`)
    })

    image.src = url
  })
}

export function loadJSON<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json())
}

export async function loadSpriteSheet(name: string) {
  const url = `public/sprites/${name}.json`
  const sheetSpec = await loadJSON<SpriteSheetSpec>(url)
  const image = await loadImage(sheetSpec.imageURL)

  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)

  if (sheetSpec.tiles) {
    sheetSpec.tiles.forEach(tileSpec => {
      const [x, y] = tileSpec.index
      sprites.defineTile(tileSpec.name, x, y)
    })
  }

  if (sheetSpec.frames) {
    sheetSpec.frames.forEach(frameSpec => {
      const [x, y, width, height] = frameSpec.rect
      sprites.define(frameSpec.name, x, y, width, height)
    })
  }

  if (sheetSpec.animations) {
    sheetSpec.animations.forEach(animSpec => {
      const animation = createAnimation(animSpec.frames, animSpec.frameLength)
      sprites.defineAnimation(animSpec.name, animation)
    })
  }

  return sprites
}

import { createAnimation } from './animation'
import { createBackgroundLayer, createSpriteLayer } from './layers'
import { Level } from './Level'
import { BackgroundSpec, LevelSpec, SpriteSheetSpec } from './loaderTypes'
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

function loadJSON<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json())
}

function createTiles(level: Level, backgrounds: BackgroundSpec[]) {
  function applyRange(
    background: BackgroundSpec,
    xStart: number,
    xLength: number,
    yStart: number,
    yLength: number,
  ) {
    const xEnd = xStart + xLength
    const yEnd = yStart + yLength
    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        level.tiles.set(x, y, {
          name: background.sprite,
          type: background.type,
        })
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach(range => {
      if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range
        applyRange(background, xStart, xLength, yStart, yLength)
      } else if (range.length === 3) {
        const [xStart, xLength, yStart] = range
        applyRange(background, xStart, xLength, yStart, 1)
      } else if (range.length === 2) {
        const [xStart, yStart] = range
        applyRange(background, xStart, 1, yStart, 1)
      }
    })
  })
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

export async function loadLevel(name: string) {
  const levelSpec = await loadJSON<LevelSpec>(`public/levels/${name}.json`)
  const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet)

  const level = new Level()

  createTiles(level, levelSpec.backgrounds)

  const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
  level.comp.layers.push(backgroundLayer)

  const spriteLayer = createSpriteLayer(level.entities)
  level.comp.layers.push(spriteLayer)

  return level
}

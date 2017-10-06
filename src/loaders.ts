import { createBackgroundLayer, createSpriteLayer } from './layers'
import { Level } from './Level'
import { loadBackgroundSprites } from './sprites'
import { fetchJSON } from './util'

export type LevelSpec = {
  backgrounds: BackgroundSpec[]
}

export type BackgroundSpec = {
  tile: string
  ranges: BackgroundRange[]
}

export type BackgroundRange = [number, number, number, number]

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

function createTiles(level: Level, backgrounds: BackgroundSpec[]) {
  backgrounds.forEach(background => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; x++) {
        for (let y = y1; y < y2; y++) {
          level.tiles.set(x, y, { name: background.tile })
        }
      }
    })
  })
}

export async function loadLevel(name: string) {
  const [levelSpec, backgroundSprites] = await Promise.all([
    fetchJSON<LevelSpec>(`/public/levels/${name}.json`),
    loadBackgroundSprites(),
  ])

  const level = new Level()

  createTiles(level, levelSpec.backgrounds)

  const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
  level.comp.layers.push(backgroundLayer)

  const spriteLayer = createSpriteLayer(level.entities)
  level.comp.layers.push(spriteLayer)

  return level
}

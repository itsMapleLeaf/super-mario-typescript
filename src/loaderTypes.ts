export type LevelSpec = {
  backgrounds: BackgroundSpec[]
  spriteSheet: string
}

export type BackgroundSpec = {
  sprite: string
  type: string
  ranges: BackgroundRange[]
}

export type BackgroundRange = number[]

export type SpriteSheetSpec = {
  imageURL: string
  tileW: number
  tileH: number
  tiles?: TileSpec[]
  frames?: FrameSpec[]
}

export type TileSpec = {
  name: string
  index: [number, number]
}

export type FrameSpec = {
  name: string
  rect: [number, number, number, number]
}

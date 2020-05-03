import { EntityFactory } from './entities'
import { Dict } from './types'

export type GameContext = {
  audioContext: AudioContext
  deltaTime: number
  entityFactory: Dict<EntityFactory>
  videoContext: CanvasRenderingContext2D
}

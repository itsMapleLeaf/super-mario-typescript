import { EntityFactory } from './entities'

export type GameContext = {
  audioContext: AudioContext
  deltaTime: number
  entityFactory: Dict<EntityFactory>
}

export type Dict<T> = { [_ in string]?: T }

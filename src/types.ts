export type GameContext = {
  audioContext: AudioContext
  deltaTime: number
}

export type Dict<T> = { [_ in string]?: T }

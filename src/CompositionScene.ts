import { GameContext } from './GameContext'
import { Scene } from './Scene'

export class CompositionScene extends Scene {
  countDown = 2

  update(gameContext: GameContext) {
    this.countDown -= gameContext.deltaTime
    if (this.countDown <= 0) {
      this.events.emit(Scene.EVENT_COMPLETE)
    }
  }
}

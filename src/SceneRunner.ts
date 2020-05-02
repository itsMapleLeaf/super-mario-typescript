import { GameContext } from './types'

export type Scene = {
  update(gameContext: GameContext): void
  draw(gameContext: GameContext): void
}

export class SceneRunner {
  sceneIndex = -1
  scenes: Scene[] = []

  addScene(scene: Scene) {
    this.scenes.push(scene)
  }

  runNext() {
    this.sceneIndex += 1
  }

  update(gameContext: GameContext) {
    const currentScene = this.scenes[this.sceneIndex]
    if (currentScene) {
      currentScene.update(gameContext)
      currentScene.draw(gameContext)
    }
  }
}

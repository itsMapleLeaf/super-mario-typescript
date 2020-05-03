import { GameContext } from './GameContext'
import { Scene } from './Scene'

export class SceneRunner {
  sceneIndex = -1
  scenes: Scene[] = []

  get currentScene(): Scene | undefined {
    return this.scenes[this.sceneIndex]
  }

  addScene(scene: Scene) {
    this.scenes.push(scene)
    scene.events.listen(Scene.EVENT_COMPLETE, () => {
      this.runNext()
    })
  }

  runNext() {
    this.currentScene?.pause()
    this.sceneIndex += 1
  }

  update(gameContext: GameContext) {
    this.currentScene?.update(gameContext)
    this.currentScene?.draw(gameContext)
  }
}

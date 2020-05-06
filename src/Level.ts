import { Camera } from './Camera'
import { Entity } from './Entity'
import { EntityCollider } from './EntityCollider'
import { GameContext } from './GameContext'
import { MusicController } from './MusicController'
import { findPlayers } from './player'
import { Scene } from './Scene'
import { TileCollider } from './TileCollider'

export class Level extends Scene {
  static EVENT_TRIGGER = Symbol('trigger')

  name = ''

  entities = new Set<Entity>()
  entityCollider = new EntityCollider(this.entities)
  tileCollider = new TileCollider()
  music = new MusicController()
  camera = new Camera()

  gravity = 1500
  totalTime = 0

  update(gameContext: GameContext) {
    this.entities.forEach((entity) => {
      entity.update(gameContext, this)
    })

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity)
    })

    this.entities.forEach((entity) => {
      entity.finalize()
    })

    this.totalTime += gameContext.deltaTime

    focusPlayer(this)
  }

  draw(gameContext: GameContext) {
    this.comp.draw(gameContext.videoContext, this.camera)
  }

  pause() {
    this.music.pause()
  }
}

function focusPlayer(level: Level) {
  for (const player of findPlayers(level.entities)) {
    level.camera.pos.x = Math.max(0, player.pos.x - 100)
  }
}

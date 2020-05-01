import { Camera } from './Camera'
import { Compositor } from './Compositor'
import { Entity } from './Entity'
import { EntityCollider } from './EntityCollider'
import { EventEmitter } from './EventEmitter'
import { MusicController } from './MusicController'
import { findPlayers } from './player'
import { TileCollider } from './TileCollider'
import { GameContext } from './types'

export class Level {
  comp = new Compositor()
  entities = new Set<Entity>()
  entityCollider = new EntityCollider(this.entities)
  tileCollider = new TileCollider()
  music = new MusicController()
  events = new EventEmitter()
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
}

function focusPlayer(level: Level) {
  for (const player of findPlayers(level)) {
    level.camera.pos.x = Math.max(0, player.pos.x - 100)
  }
}

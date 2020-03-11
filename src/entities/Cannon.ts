import { EntityFactoryDict } from '../entities'
import { Entity } from '../Entity'
import { Level } from '../Level'
import { loadAudioBoard } from '../loaders/audio'
import { Emitter } from '../traits/Emitter'

export async function loadCannon(
  audioContext: AudioContext,
  entityFactory: EntityFactoryDict,
) {
  const audio = await loadAudioBoard('mario', audioContext)

  function emitBullet(entity: Entity, level: Level) {
    const bullet = entityFactory.bullet?.()
    if (!bullet) return

    bullet.pos.copy(entity.pos)
    level.entities.add(bullet)
  }

  return function createCannon() {
    const cannon = new Entity()
    cannon.audio = audio

    const emitter = cannon.addTrait(new Emitter())
    emitter.emitters.push(emitBullet)

    return cannon
  }
}

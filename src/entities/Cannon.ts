import { Entity } from '../Entity'
import { GameContext } from '../GameContext'
import { Level } from '../Level'
import { loadAudioBoard } from '../loaders/audio'
import { findPlayers } from '../player'
import { Emitter } from '../traits/Emitter'

const HOLD_FIRE_THRESHOLD = 30

export async function loadCannon(audioContext: AudioContext) {
  const audio = await loadAudioBoard('cannon', audioContext)

  const getDiffX = (e1: Entity, e2: Entity) => Math.abs(e1.pos.x - e2.pos.x)

  function emitBullet(cannon: Entity, gameContext: GameContext, level: Level) {
    const bullet = gameContext.entityFactory.bullet?.()
    if (!bullet) return

    const players = [...findPlayers(level.entities)]

    const shouldHoldFire = players.some((player) => {
      return getDiffX(player, cannon) <= HOLD_FIRE_THRESHOLD
    })
    if (shouldHoldFire) return

    const closestPlayer = players.reduce((closest, current) => {
      const closestDist = getDiffX(closest, cannon)
      const currentDist = getDiffX(current, cannon)
      return currentDist < closestDist ? current : closest
    })

    // can't use Math.sign here, otherwise we might get 0
    const fireDirection = closestPlayer.pos.x < cannon.pos.x ? -1 : 1

    bullet.pos.copy(cannon.pos)
    bullet.vel.x = 80 * fireDirection

    level.entities.add(bullet)
    cannon.sounds.add('shoot')
  }

  return function createCannon() {
    const cannon = new Entity()
    cannon.audio = audio

    const emitter = new Emitter()
    emitter.interval = 4
    emitter.emitters.push(emitBullet)

    cannon.addTrait(emitter)

    return cannon
  }
}

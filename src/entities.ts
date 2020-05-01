import { loadBullet } from './entities/Bullet'
import { loadCannon } from './entities/Cannon'
import { loadGoomba } from './entities/Goomba'
import { loadKoopa } from './entities/Koopa'
import { loadMario } from './entities/Mario'
import { Entity } from './Entity'
import { Dict } from './types'

export type EntityFactory = () => Entity

export type EntityFactoryDict = Dict<EntityFactory>

export async function loadEntities(
  audioContext: AudioContext,
): Promise<EntityFactoryDict> {
  const factories: EntityFactoryDict = {}

  const addAs = (name: string) => (factory: EntityFactory) => {
    factories[name] = factory
  }

  await Promise.all([
    loadMario(audioContext).then(addAs('mario')),
    loadGoomba().then(addAs('goomba')),
    loadKoopa().then(addAs('koopa')),
    loadBullet().then(addAs('bullet')),
    loadCannon(audioContext).then(addAs('cannon')),
  ])

  return factories
}

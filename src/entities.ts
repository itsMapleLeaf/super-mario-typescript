import { loadBullet } from './entities/Bullet'
import { loadGoomba } from './entities/Goomba'
import { loadKoopa } from './entities/Koopa'
import { loadMario } from './entities/Mario'
import { Entity } from './Entity'
import { Dict } from './types'

export type EntityFactoryDict = Dict<() => Entity>

export async function loadEntities(
  audioContext: AudioContext,
): Promise<EntityFactoryDict> {
  const [mario, goomba, koopa, bullet] = await Promise.all([
    loadMario(audioContext),
    loadGoomba(),
    loadKoopa(),
    loadBullet(),
  ])

  return { mario, goomba, koopa, bullet }
}

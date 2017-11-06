import { loadGoomba } from './entities/Goomba'
import { loadKoopa } from './entities/Koopa'
import { loadMario } from './entities/Mario'
import { Entity } from './Entity'

export type EntityFactory = {
  [name: string]: () => Entity
}

export async function loadEntities(): Promise<EntityFactory> {
  const [mario, goomba, koopa] = await Promise.all([loadMario(), loadGoomba(), loadKoopa()])
  return { mario, goomba, koopa }
}

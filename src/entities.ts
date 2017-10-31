import { loadGoomba } from './entities/Goomba'
import { loadKoopa } from './entities/Koopa'
import { loadMario } from './entities/Mario'

export async function loadEntities() {
  const [createMario, createGoomba, createKoopa] = await Promise.all([
    loadMario(),
    loadGoomba(),
    loadKoopa(),
  ])
  return { createMario, createGoomba, createKoopa }
}

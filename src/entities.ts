import { Goomba, loadGoomba } from './entities/Goomba'
import { Koopa, loadKoopa } from './entities/Koopa'
import { loadMario, Mario } from './entities/Mario'

export type EntityFactory = {
  mario: () => Mario
  goomba: () => Goomba
  koopa: () => Koopa
}

export async function loadEntities(
  audioContext: AudioContext,
): Promise<EntityFactory> {
  const [mario, goomba, koopa] = await Promise.all([
    loadMario(audioContext),
    loadGoomba(),
    loadKoopa(),
  ])

  return { mario, goomba, koopa }
}

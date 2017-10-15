import { Mario } from './entities/Mario'
import { loadSpriteSheet } from './loaders'

export async function createMario() {
  return new Mario(await loadSpriteSheet('mario'))
}

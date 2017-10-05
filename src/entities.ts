import { Entity } from './Entity'
import { loadMarioSprite } from './sprites'
import { Go } from './traits/Go'
import { Jump } from './traits/Jump'

export async function createMario() {
  const sprites = await loadMarioSprite()

  const mario = new Entity()
  mario.size.set(14, 16)
  mario.addTrait(new Jump())
  mario.addTrait(new Go())

  mario.draw = function drawMario(context: CanvasRenderingContext2D) {
    sprites.draw('idle', context, this.pos.x, this.pos.y)
  }

  return mario
}

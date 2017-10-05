import { Entity } from './Entity'
import { loadMarioSprite } from './sprites'
import { Jump } from './traits/Jump'
import { SpriteSheet } from './SpriteSheet'
import { Go } from './traits/Go'

export function createMario() {
  return loadMarioSprite().then((sprites: SpriteSheet) => {
    const mario = new Entity()

    mario.size.set(14, 16)

    mario.addTrait(new Jump())
    // mario.addTrait(new Velocity())
    mario.addTrait(new Go())

    mario.draw = function drawMario(context: CanvasRenderingContext2D) {
      sprites.draw('idle', context, this.pos.x, this.pos.y)
    }

    return mario
  })
}

import { Entity } from './Entity'
import { loadMarioSprite } from './sprites'
import { SpriteSheet } from './SpriteSheet'
import { Go } from './traits/Go'
import { Jump } from './traits/Jump'

class Mario extends Entity {
  constructor(private sprites: SpriteSheet) {
    super()
    this.size.set(14, 16)
    this.addTrait(new Jump())
    this.addTrait(new Go())
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprites.draw('idle', context, this.pos.x, this.pos.y)
  }
}

export async function createMario() {
  return new Mario(await loadMarioSprite())
}

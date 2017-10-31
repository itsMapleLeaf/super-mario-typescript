import { Animation } from '../animation'
import { Entity } from '../Entity'
import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../SpriteSheet'
import { PendulumWalk } from '../traits/PendulumWalk'

export class Koopa extends Entity {
  walk = this.addTrait(new PendulumWalk())

  constructor(private sprites: SpriteSheet, private walkAnim: Animation) {
    super()
    this.size.set(16, 16)
    this.offset.set(0, 8)
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprites.draw(this.walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0)
  }
}

export async function loadKoopa() {
  const sprites = await loadSpriteSheet('koopa')
  const walkAnim = sprites.getAnimation('walk')

  return function createKoopa() {
    return new Koopa(sprites, walkAnim)
  }
}

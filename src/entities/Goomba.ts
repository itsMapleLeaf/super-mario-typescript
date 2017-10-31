import { Animation } from '../animation'
import { Entity } from '../Entity'
import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../SpriteSheet'
import { PendulumWalk } from '../traits/PendulumWalk'

export class Goomba extends Entity {
  walk = this.addTrait(new PendulumWalk())

  constructor(private sprites: SpriteSheet, private walkAnim: Animation) {
    super()
    this.size.set(16, 16)
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprites.draw(this.walkAnim(this.lifetime), context, 0, 0)
  }
}

export async function loadGoomba() {
  const sprites = await loadSpriteSheet('goomba')
  const walkAnim = sprites.getAnimation('walk')

  return function createGoomba() {
    return new Goomba(sprites, walkAnim)
  }
}

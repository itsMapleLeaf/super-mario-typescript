import { Animation } from '../animation'
import { Entity } from '../Entity'
import { loadSpriteSheet } from '../loaders/sprite'
import { SpriteSheet } from '../SpriteSheet'
import { Trait } from '../Trait'
import { Killable } from '../traits/Killable'
import { PendulumMove } from '../traits/PendulumMove'
import { Physics } from '../traits/Physics'
import { Solid } from '../traits/Solid'
import { Stomper } from '../traits/Stomper'

class GoombaBehavior extends Trait {
  collides(us: Entity, them: Entity) {
    if (us.getTrait(Killable)?.dead) {
      return
    }

    const stomper = them.getTrait(Stomper)
    if (stomper) {
      if (them.vel.y > us.vel.y) {
        us.useTrait(PendulumMove, (pm) => (pm.speed = 0))
        us.useTrait(Killable, (k) => k.kill())
      } else {
        them.getTrait(Killable)?.kill()
      }
    }
  }
}

export class Goomba extends Entity {
  walk = this.addTrait(new PendulumMove())
  behavior = this.addTrait(new GoombaBehavior())
  killable = this.addTrait(new Killable())
  solid = this.addTrait(new Solid())
  physics = this.addTrait(new Physics())

  constructor(private sprites: SpriteSheet, private walkAnim: Animation) {
    super()
    this.size.set(16, 16)
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprites.draw(this.routeAnim(), context, 0, 0)
  }

  private routeAnim() {
    if (this.killable.dead) {
      return 'flat'
    }
    return this.walkAnim(this.lifetime)
  }
}

export async function loadGoomba() {
  const sprites = await loadSpriteSheet('goomba')
  const walkAnim = sprites.getAnimation('walk')

  return function createGoomba() {
    return new Goomba(sprites, walkAnim)
  }
}

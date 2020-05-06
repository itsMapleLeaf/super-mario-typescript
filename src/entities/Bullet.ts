import { Entity } from '../Entity'
import { GameContext } from '../GameContext'
import { Level } from '../Level'
import { loadSpriteSheet } from '../loaders/sprite'
import { Trait } from '../Trait'
import { Gravity } from '../traits/Gravity'
import { Killable } from '../traits/Killable'
import { Stomper } from '../traits/Stomper'
import { Velocity } from '../traits/Velocity'

class BulletBehavior extends Trait {
  gravity = new Gravity()

  collides(us: Entity, them: Entity) {
    if (us.getTrait(Killable)?.dead) {
      return
    }

    const stomper = them.getTrait(Stomper)
    if (stomper) {
      if (them.vel.y > us.vel.y) {
        us.getTrait(Killable)?.kill()
        us.vel.set(100, -200)
      } else {
        them.getTrait(Killable)?.kill()
      }
    }
  }

  update(entity: Entity, gameContext: GameContext, level: Level) {
    if (entity.getTrait(Killable)?.dead) {
      this.gravity.update(entity, gameContext, level)
    }
  }
}

export async function loadBullet() {
  const sprites = await loadSpriteSheet('bullet')

  return function createBullet() {
    const bullet = new Entity()

    bullet.size.set(16, 14)
    bullet.vel.set(80, 0)

    bullet.addTrait(new BulletBehavior())
    bullet.addTrait(new Killable())
    bullet.addTrait(new Velocity())

    bullet.draw = (context) => {
      sprites.draw('bullet', context, 0, 0, bullet.vel.x < 0)
    }

    return bullet
  }
}

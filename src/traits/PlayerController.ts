import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { Vec2 } from '../math'
import { Killable } from './Killable'
import { Stomper } from './Stomper'

export class PlayerController extends Trait {
  player: Entity
  checkpoint = new Vec2(0, 0)
  time = 300
  score = 0

  constructor() {
    super('playerController')
  }

  setPlayer(entity: Entity) {
    this.player = entity

    const stomper = this.player.getTrait(Stomper)
    if (stomper) {
      stomper.onStomp = () => {
        this.score += 100
      }
    }
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    if (!level.entities.has(this.player)) {
      this.player.getTrait(Killable)!.revive()
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y)
      level.entities.add(this.player)
    } else {
      this.time -= deltaTime * 2
    }
  }
}
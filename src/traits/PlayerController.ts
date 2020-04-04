import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { Vec2 } from '../math'
import { GameContext } from '../types'
import { Killable } from './Killable'

export class PlayerController extends Trait {
  checkpoint = new Vec2(0, 0)

  constructor(private player: Entity) {
    super()
  }

  update(_: Entity, __: GameContext, level: Level) {
    if (!level.entities.has(this.player)) {
      this.player.getTrait(Killable)!.revive()
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y)
      level.entities.add(this.player)
    }
  }
}

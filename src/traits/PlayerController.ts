import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { Vec2 } from '../math'
import { GameContext } from '../types'
import { Killable } from './Killable'
import { Stomper } from './Stomper'

export class PlayerController extends Trait {
  checkpoint = new Vec2(0, 0)
  time = 300
  score = 0

  constructor(private player: Entity) {
    super()

    const stomper = this.player.getTrait(Stomper)
    if (stomper) {
      stomper.events.listen('stomp', () => {
        this.score += 100
      })
    }
  }

  update(_: Entity, { deltaTime }: GameContext, level: Level) {
    if (!level.entities.has(this.player)) {
      this.player.getTrait(Killable)!.revive()
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y)
      level.entities.add(this.player)
    } else {
      this.time -= deltaTime * 2
    }
  }
}

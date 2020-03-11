import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { GameContext } from '../types'

type EmitterFn = (entity: Entity, level: Level) => void

export class Emitter extends Trait {
  interval = 2
  coolDown = this.interval
  emitters: EmitterFn[] = []

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    this.coolDown -= deltaTime
    if (this.coolDown <= 0) {
      this.emit(entity, level)
      this.coolDown = this.interval
    }
  }

  emit(entity: Entity, level: Level) {
    for (const emitter of this.emitters) {
      emitter(entity, level)
    }
  }
}

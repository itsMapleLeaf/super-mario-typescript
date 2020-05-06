import { Entity } from '../Entity'
import { GameContext } from '../GameContext'
import { Level } from '../Level'
import { Trait } from '../Trait'

export class LevelTimer extends Trait {
  static EVENT_TIMER_HURRY = Symbol('timer hurry')
  static EVENT_TIMER_OK = Symbol('timer ok')

  totalTime = 300
  currentTime = this.totalTime
  hurryTime = 100
  hurryEmitted?: boolean

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    this.currentTime -= deltaTime * 2

    if (this.hurryEmitted !== true && this.currentTime < this.hurryTime) {
      level.events.emit(LevelTimer.EVENT_TIMER_HURRY)
      this.hurryEmitted = true
    }

    if (this.hurryEmitted !== false && this.currentTime > this.hurryTime) {
      level.events.emit(LevelTimer.EVENT_TIMER_OK)
      this.hurryEmitted = false
    }
  }
}

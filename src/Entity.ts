import { AudioBoard } from './AudioBoard'
import { BoundingBox } from './BoundingBox'
import { EventEmitter } from './EventEmitter'
import { Level } from './Level'
import { Vec2 } from './math'
import { TileResolverMatch } from './TileResolver'
import { GameContext } from './types'

export enum Side {
  top,
  bottom,
  left,
  right,
}

type TraitTask = () => void

export abstract class Trait {
  private tasks: TraitTask[] = []
  events = new EventEmitter()

  update(entity: Entity, gameContext: GameContext, level: Level) {}
  obstruct(entity: Entity, side: Side, match: TileResolverMatch) {}
  collides(us: Entity, them: Entity) {}

  queue(task: TraitTask) {
    this.tasks.push(task)
  }

  finalize() {
    this.tasks.forEach(task => task())
    this.tasks.splice(0)
  }
}

type TraitConstructor<T extends Trait> = new (...args: any[]) => T

export class Entity {
  // audio = new AudioBoard()
  audio?: AudioBoard
  pos = new Vec2()
  vel = new Vec2()
  size = new Vec2()
  offset = new Vec2()
  bounds = new BoundingBox(this.pos, this.size, this.offset)
  traits = [] as Trait[]
  lifetime = 0
  sounds = new Set<string>()

  addTrait<T extends Trait>(trait: T): T {
    this.traits.push(trait)
    return trait
  }

  getTrait<T extends Trait>(TraitClass: TraitConstructor<T>): T | undefined {
    for (const trait of this.traits) {
      if (trait instanceof TraitClass) {
        return trait
      }
    }
    return undefined
  }

  update(gameContext: GameContext, level: Level) {
    this.traits.forEach(trait => {
      trait.update(this, gameContext, level)
    })

    if (this.audio) this.playSounds(this.audio, gameContext.audioContext)

    this.lifetime += gameContext.deltaTime
  }

  draw(context: CanvasRenderingContext2D) {}

  finalize() {
    this.traits.forEach(trait => {
      trait.finalize()
    })
  }

  obstruct(side: Side, match: TileResolverMatch) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side, match)
    })
  }

  collides(candidate: Entity) {
    this.traits.forEach(trait => {
      trait.collides(this, candidate)
    })
  }

  private playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach(name => audioBoard.play(name, audioContext))
    this.sounds.clear()
  }
}

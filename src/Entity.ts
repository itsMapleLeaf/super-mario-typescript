import { AudioBoard } from './AudioBoard'
import { BoundingBox } from './BoundingBox'
import { EventBuffer } from './EventBuffer'
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

type TraitTask = (...args: any[]) => void

type TraitListener = {
  name: string | symbol
  callback: () => void
  count: number
}

export abstract class Trait {
  static EVENT_TASK = Symbol('task')

  private listeners: TraitListener[] = []

  protected listen(
    name: string | symbol,
    callback: () => void,
    count = Infinity,
  ) {
    this.listeners.push({ name, callback, count })
  }

  queue(task: TraitTask) {
    this.listen(Trait.EVENT_TASK, task, 1)
  }

  finalize(entity: Entity) {
    for (const listener of this.listeners) {
      entity.events.process(listener.name, listener.callback)
      listener.count -= 1
    }

    this.listeners = this.listeners.filter((listener) => listener.count > 0)
  }

  update(entity: Entity, gameContext: GameContext, level: Level) {}
  obstruct(entity: Entity, side: Side, match: TileResolverMatch) {}
  collides(us: Entity, them: Entity) {}
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
  events = new EventBuffer()

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

  useTrait<T extends Trait>(
    TraitClass: TraitConstructor<T>,
    fn: (trait: T) => void,
  ): void {
    const trait = this.getTrait(TraitClass)
    if (trait) fn(trait)
  }

  update(gameContext: GameContext, level: Level) {
    this.traits.forEach((trait) => {
      trait.update(this, gameContext, level)
    })

    if (this.audio) this.playSounds(this.audio, gameContext.audioContext)

    this.lifetime += gameContext.deltaTime
  }

  draw(context: CanvasRenderingContext2D) {}

  finalize() {
    this.events.emit(Trait.EVENT_TASK, this)

    this.traits.forEach((trait) => {
      trait.finalize(this)
    })

    this.events.clear()
  }

  obstruct(side: Side, match: TileResolverMatch) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side, match)
    })
  }

  collides(candidate: Entity) {
    this.traits.forEach((trait) => {
      trait.collides(this, candidate)
    })
  }

  private playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach((name) => audioBoard.play(name, audioContext))
    this.sounds.clear()
  }
}

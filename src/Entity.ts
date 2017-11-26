import { BoundingBox } from './BoundingBox'
import { Level } from './Level'
import { Vec2 } from './math'
import { TileResolverMatch } from './TileResolver'

export enum Side {
  top,
  bottom,
  left,
  right,
}

export abstract class Trait {
  tasks = [] as Array<() => void>

  constructor(public NAME: string) {}
  update(entity: Entity, deltaTime: number, level: Level) {}
  obstruct(entity: Entity, side: Side, match: TileResolverMatch<any>) {}
  collides(us: Entity, them: Entity) {}

  queue(task: () => void) {
    this.tasks.push(task)
  }

  finalize() {
    this.tasks.forEach(task => task())
    this.tasks.splice(0)
  }
}

interface TraitConstructor<T extends Trait> {
  new (): T
}

export class Entity {
  pos = new Vec2()
  vel = new Vec2()
  size = new Vec2()
  offset = new Vec2()
  bounds = new BoundingBox(this.pos, this.size, this.offset)
  traits = [] as Trait[]
  lifetime = 0

  addTrait<T extends Trait>(trait: T): T {
    this.traits.push(trait)
    return trait
  }

  getTrait<T extends Trait>(TraitClass: TraitConstructor<T>): T | void {
    for (const trait of this.traits) {
      if (trait instanceof TraitClass) {
        return trait as T
      }
    }
    return undefined
  }

  update(deltaTime: number, level: Level) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime, level)
    })
    this.lifetime += deltaTime
  }

  draw(context: CanvasRenderingContext2D) {}

  finalize() {
    this.traits.forEach(trait => {
      trait.finalize()
    })
  }

  obstruct(side: Side, match: TileResolverMatch<any>) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side, match)
    })
  }

  collides(candidate: Entity) {
    this.traits.forEach(trait => {
      trait.collides(this, candidate)
    })
  }
}

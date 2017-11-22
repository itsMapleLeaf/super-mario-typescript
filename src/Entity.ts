import { BoundingBox } from './BoundingBox'
import { Level } from './Level'
import { Vec2 } from './math'

export enum Side {
  top,
  bottom,
  left,
  right,
}

export abstract class Trait {
  constructor(public NAME: string) {}
  update(entity: Entity, deltaTime: number, level: Level) {}
  obstruct(entity: Entity, side: Side) {}
  collides(us: Entity, them: Entity) {}
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
  canCollide = true

  addTrait<T extends Trait>(trait: T): T {
    this.traits.push(trait)
    return trait
  }

  getTrait<T extends Trait>(TraitClass: TraitConstructor<T>): T | null {
    const trait = this.traits.find(trait => trait instanceof TraitClass)
    return trait as T | null
  }

  update(deltaTime: number, level: Level) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime, level)
    })
    this.lifetime += deltaTime
  }

  draw(context: CanvasRenderingContext2D) {}

  obstruct(side: Side) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side)
    })
  }

  collides(candidate: Entity) {
    this.traits.forEach(trait => {
      trait.collides(this, candidate)
    })
  }
}

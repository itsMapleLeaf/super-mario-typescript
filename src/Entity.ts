import { Vec2 } from './math'
import { BoundingBox } from './BoundingBox'

export enum Side {
  top,
  bottom,
  left,
  right,
}

export abstract class Trait {
  constructor(public NAME: string) {}

  abstract update(entity: Entity, deltaTime: number): void
  obstruct(entity: Entity, side: Side) {}
}

export abstract class Entity {
  pos = new Vec2()
  vel = new Vec2()
  size = new Vec2()
  offset = new Vec2()
  bounds = new BoundingBox(this.pos, this.size, this.offset)
  traits = [] as Trait[]
  lifetime = 0

  addTrait(trait: Trait) {
    this.traits.push(trait)
    return trait
  }

  getTrait<T extends Trait>(name: string): T {
    const trait = this.traits.find(trait => trait.NAME === name)
    if (!trait) throw new Error('Trait not found:' + name)
    return trait as T
  }

  update(deltaTime: number) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime)
    })
    this.lifetime += deltaTime
  }

  abstract draw(context: CanvasRenderingContext2D): void

  obstruct(side: Side) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side)
    })
  }
}

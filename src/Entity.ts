import { Vec2 } from './math'

export abstract class Trait {
  constructor(public NAME: string) {}

  abstract update(entity: Entity, deltaTime: number): void
}

export abstract class Entity {
  pos = new Vec2(0, 0)
  vel = new Vec2(0, 0)
  size = new Vec2(0, 0)

  traits = [] as Trait[]

  addTrait(trait: Trait) {
    this.traits.push(trait)
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
  }

  abstract draw(context: CanvasRenderingContext2D): void
}

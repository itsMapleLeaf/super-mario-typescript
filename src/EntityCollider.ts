import { Entity } from './Entity'

export class EntityCollider {
  constructor(public entities: Set<Entity>) {}

  check(subject: Entity) {
    for (const candidate of this.entities) {
      if (subject === candidate) continue

      if (subject.bounds.overlaps(candidate.bounds)) {
        subject.collides(candidate)
      }
    }
  }
}

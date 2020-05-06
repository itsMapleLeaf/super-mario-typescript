import { Entity } from '../Entity'
import { Trait } from '../Trait'
import { Stomper } from './Stomper'

const COIN_LIFE_THRESHOLD = 100

export class Player extends Trait {
  name = 'UNNAMED'
  coins = 0
  lives = 3
  score = 0

  constructor() {
    super()

    this.listen(Stomper.EVENT_STOMP, () => {
      this.score += 100
    })
  }

  addCoins(count: number) {
    this.coins += count
    while (this.coins >= COIN_LIFE_THRESHOLD) {
      this.addLives(1)
      this.coins -= COIN_LIFE_THRESHOLD
    }

    this.queue((entity: Entity) => entity.sounds.add('coin'))
  }

  addLives(count: number) {
    this.lives += count
  }
}

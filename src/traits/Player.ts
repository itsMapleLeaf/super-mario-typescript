import { Trait } from '../Entity'
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
    if (this.coins >= COIN_LIFE_THRESHOLD) {
      const lifeCount = Math.floor(this.coins / COIN_LIFE_THRESHOLD)
      this.addLives(lifeCount)
      this.coins = this.coins % COIN_LIFE_THRESHOLD
    }

    this.queue(entity => entity.sounds.add('coin'))
  }

  addLives(count: number) {
    this.lives += count
  }
}

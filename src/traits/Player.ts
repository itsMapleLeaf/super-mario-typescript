import { Trait } from '../Entity'
import { Stomper } from './Stomper'

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
}

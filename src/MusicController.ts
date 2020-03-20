import { MusicPlayer } from './MusicPlayer'

export class MusicController {
  player?: MusicPlayer

  setPlayer(player: MusicPlayer) {
    this.player = player
  }
}

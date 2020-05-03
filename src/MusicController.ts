import { MusicPlayer } from './MusicPlayer'

export class MusicController {
  player?: MusicPlayer

  setPlayer(player: MusicPlayer) {
    this.player = player
  }

  playTheme(speed = 1) {
    const audio = this.player?.playTrack('main')
    if (audio) {
      audio.playbackRate = speed
    }
  }

  playHurryTheme() {
    const audio = this.player?.playTrack('hurry')
    if (audio) {
      audio.loop = false
      audio.addEventListener('ended', () => this.playTheme(1.3), { once: true })
    }
  }

  pause() {
    this.player?.pauseAll()
  }
}

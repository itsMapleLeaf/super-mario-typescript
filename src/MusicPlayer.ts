export class MusicPlayer {
  tracks = new Map<string, HTMLAudioElement>()

  addTrack(name: string, url: string) {
    const audio = new Audio()
    audio.loop = true
    audio.src = url
    this.tracks.set(name, audio)
  }

  playTrack(name: string) {
    const audio = this.tracks.get(name)
    audio?.play()
  }
}

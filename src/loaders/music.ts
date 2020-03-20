import { loadJSON } from '../loaders'
import { MusicPlayer } from '../MusicPlayer'

type MusicSheetSpec = {
  [_ in string]: {
    url: string
  }
}

export async function loadMusicSheet(name: string) {
  const musicSheet = await loadJSON<MusicSheetSpec>(`/music/${name}.json`)

  const musicPlayer = new MusicPlayer()
  for (const [name, track] of Object.entries(musicSheet)) {
    musicPlayer.addTrack(name, track.url)
  }

  return musicPlayer
}

import { AudioBoard } from '../AudioBoard'
import { loadJSON } from '../loaders'

export function createAudioLoader(context: AudioContext) {
  return async function loadAudio(url: string) {
    const res = await fetch(url)
    const data = await res.arrayBuffer()
    return context.decodeAudioData(data)
  }
}

export async function loadAudioBoard(name: string, audioContext: AudioContext) {
  const loadAudio = createAudioLoader(audioContext)

  const audioSheet = await loadJSON<{ fx: Record<string, { url: string }> }>(
    `/sounds/${name}.json`,
  )

  const audioBoard = new AudioBoard()

  const audioLoadingTasks = Object.entries(audioSheet.fx).map(
    ([name, { url }]) =>
      loadAudio(url)
        .then(buffer => audioBoard.add(name, buffer))
        .catch(() => console.error(`failed to load ${url}`)),
  )

  await Promise.all(audioLoadingTasks)

  return audioBoard
}

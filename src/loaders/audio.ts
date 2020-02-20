export function createAudioLoader(context: AudioContext) {
  return function loadAudio(url: string) {
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(data => context.decodeAudioData(data))
  }
}

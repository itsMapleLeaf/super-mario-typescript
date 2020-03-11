export type Animation = (distance: number) => string

export function createAnimation(
  frames: string[],
  frameLength: number,
): Animation {
  return function resolveFrame(time: number) {
    const frameIndex = Math.floor((time / frameLength) % frames.length)
    return frames[frameIndex]
  }
}

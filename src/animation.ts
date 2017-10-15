export type Animation = (distance: number) => string

export function createAnimation(
  frames: string[],
  frameLength: number,
): Animation {
  return function resolveFrame(distance: number) {
    const frameIndex = Math.floor((distance / frameLength) % frames.length)
    return frames[frameIndex]
  }
}

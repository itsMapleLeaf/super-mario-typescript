import { Camera } from '../Camera'

export function createCameraLayer(cameraToDraw: Camera) {
  return function drawCameraRect(
    context: CanvasRenderingContext2D,
    fromCamera: Camera,
  ) {
    context.strokeStyle = 'purple'
    context.strokeRect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y,
    )
  }
}

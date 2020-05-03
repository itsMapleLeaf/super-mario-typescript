export function createColorLayer(color: string) {
  return function drawColor(context: CanvasRenderingContext2D) {
    context.fillStyle = color
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }
}

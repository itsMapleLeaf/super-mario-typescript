type LayerFunction = (context: CanvasRenderingContext2D) => void

export class Compositor {
  layers = [] as LayerFunction[]

  draw(context: CanvasRenderingContext2D) {
    this.layers.forEach(layer => {
      layer(context)
    })
  }
}

import { Camera } from './Camera'
import { Entity } from './Entity'

const mouseEvents = ['mousedown', 'mousemove']

export function setupMouseControl(
  canvas: HTMLCanvasElement,
  entity: Entity,
  camera: Camera,
) {
  let lastEvent: MouseEvent | void

  mouseEvents.forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if (event instanceof MouseEvent) {
        if (event.buttons === 1) {
          entity.vel.set(0, 0)
          entity.pos.set(
            event.offsetX + camera.pos.x,
            event.offsetY + camera.pos.y,
          )
        } else if (
          event.buttons === 2 &&
          lastEvent &&
          lastEvent.buttons === 2 &&
          lastEvent.type === 'mousemove'
        ) {
          camera.pos.x -= event.offsetX - lastEvent.offsetX
        }

        lastEvent = event
      }
    })
  })

  canvas.addEventListener('contextmenu', event => {
    event.preventDefault()
  })
}

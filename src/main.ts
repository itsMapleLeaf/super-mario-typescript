import { AudioBoard } from './AudioBoard'
import { Camera } from './Camera'
import { loadEntities } from './entities'
import { Mario } from './entities/Mario'
import { Entity } from './Entity'
import { setupGamepad, setupKeyboard } from './input'
import { createCollisionLayer } from './layers/collision'
import { createDashboardLayer } from './layers/dashboard'
import { createAudioLoader } from './loaders/audio'
import { loadFont } from './loaders/font'
import { createLevelLoader } from './loaders/level'
import { Timer } from './Timer'
import { PlayerController } from './traits/PlayerController'

function createPlayerEnv(playerEntity: Entity) {
  const playerEnv = new Entity()
  const playerControl = new PlayerController()
  playerControl.checkpoint.set(64, 64)
  playerControl.setPlayer(playerEntity)
  playerEnv.addTrait(playerControl)
  return playerEnv
}

async function main(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')!

  const [entityFactory, font] = await Promise.all([loadEntities(), loadFont()])
  const loadLevel = createLevelLoader(entityFactory)
  const level = await loadLevel('1-1')

  const audioContext = new AudioContext()
  const audioBoard = new AudioBoard(audioContext)

  const loadAudio = createAudioLoader(audioContext)

  loadAudio('/audio/jump.ogg').then(buffer => {
    audioBoard.add('jump', buffer)
  })

  const camera = new Camera()

  const mario = entityFactory.mario() as Mario
  mario.pos.set(64, 64)
  level.entities.add(mario)

  const playerEnv = createPlayerEnv(mario)
  level.entities.add(playerEnv)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  const checkGamepadInput = setupGamepad(mario)

  const timer = new Timer()

  level.comp.layers.push(createCollisionLayer(level))
  level.comp.layers.push(createDashboardLayer(font, playerEnv))

  timer.update = function update(deltaTime) {
    level.update({ deltaTime, audioBoard })

    camera.pos.x = Math.max(0, mario.pos.x - 100)

    checkGamepadInput()

    level.comp.draw(context, camera)
  }

  timer.start()
}

const canvas = document.getElementById('screen')
if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error)
} else {
  console.warn('Canvas not found')
}

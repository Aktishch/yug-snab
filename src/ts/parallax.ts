import { coordinates } from './functions/coordinates'
import touchDevice from './functions/touch-device'

const init = (): void => {
  const parallaxes = document.querySelectorAll('*[data-parallax]') as NodeListOf<Element>

  parallaxes.forEach((element: Element): void => {
    const parallax = element as HTMLElement

    if (!parallax || touchDevice.init()) return

    const layers = parallax.querySelectorAll('*[data-parallax-layer]') as NodeListOf<Element>

    layers.forEach((element: Element): void => {
      const layer = element as HTMLElement

      if (!layer) return

      const speed: number = layer.dataset.parallaxSpeed ? Number(layer.dataset.parallaxSpeed) / 100 : 0.05
      const depth: number = layer.dataset.parallaxDepth ? Number(layer.dataset.parallaxDepth) : 1
      let positionY = 0
      let positionX = 0
      let currentY = 0
      let currentX = 0

      const setParallaxPosition = (): void => {
        const initialY: number = currentY - positionY
        const initialX: number = currentX - positionX

        positionY += initialY * speed
        positionX += initialX * speed

        switch (layer.dataset.parallaxLayer) {
        case 'auto': {
          layer.style.transform = `translate(${positionX / depth}%, ${positionY / depth}%)`
          break
        }

        case 'opposite': {
          layer.style.transform = `translate(${-positionX / depth}%, ${-positionY / depth}%)`
          break
        }
        }

        window.requestAnimationFrame(setParallaxPosition)
      }

      window.requestAnimationFrame(setParallaxPosition)

      parallax.addEventListener('mousemove', ((event: MouseEvent): void => {
        const height: number = parallax.offsetHeight
        const width: number = parallax.offsetWidth
        const coordinates: coordinates = {
          top: event.clientY - height / 2,
          left: event.clientX - width / 2,
        }

        currentY = (coordinates.top / height) * 100
        currentX = (coordinates.left / width) * 100
      }) as EventListener)
    })
  })
}

export default { init }

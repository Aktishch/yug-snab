import { coordinates } from './functions/coordinates'
import touchDevice from './functions/touch-device'

const init = (): void => {
  const body = document.body as HTMLBodyElement
  const parallaxItems = body.querySelectorAll('*[data-parallax]') as NodeListOf<Element>

  parallaxItems.forEach((element: Element): void => {
    const parallaxItem = element as HTMLElement

    if (!parallaxItem) return

    if (!touchDevice.init()) {
      body.addEventListener('mousemove', ((event: MouseEvent): void => {
        const coordinates: coordinates = {
          top: event.clientY / window.innerHeight,
          left: event.clientX / window.innerWidth,
        }

        parallaxItem.style.setProperty('--y', `${coordinates.top}px`)
        parallaxItem.style.setProperty('--x', `${coordinates.left}px`)
      }) as EventListener)
    }
  })
}

export default { init }

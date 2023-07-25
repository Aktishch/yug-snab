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

      // let positionY = 0
      // let positionX = 0

      parallax.addEventListener('mousemove', ((event: MouseEvent): void => {
        const coordinates: coordinates = {
          top: event.clientY - window.innerHeight / 2,
          left: event.clientX - window.innerWidth / 2,
        }

        const percentY: number = (coordinates.top / window.innerHeight) * 100
        const percentX: number = (coordinates.left / window.innerWidth) * 100

        // console.log(positionY, positionX)
        // layer.style.transform = `translate(${positionX}px, ${positionY}px)`
      }) as EventListener)
    })
  })
  // const body = document.body as HTMLBodyElement
  // const parallaxItems = body.querySelectorAll('*[data-parallax]') as NodeListOf<Element>
  // parallaxItems.forEach((element: Element): void => {
  //   const parallaxItem = element as HTMLElement
  //   if (!parallaxItem || touchDevice.init()) return
  //   body.addEventListener('mousemove', ((event: MouseEvent): void => {
  //     const coordinates: coordinates = {
  //       top: event.clientY / window.innerHeight,
  //       left: event.clientX / window.innerWidth,
  //     }
  //     parallaxItem.style.setProperty('--y', `${coordinates.top}px`)
  //     parallaxItem.style.setProperty('--x', `${coordinates.left}px`)
  //   }) as EventListener)
  // })
}

export default { init }

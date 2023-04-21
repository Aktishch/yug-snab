import { coordinates } from './functions/coordinates'
import scrolledPage from './functions/scrolled-page'

const init = (): void => {

  const body = document.body as HTMLBodyElement
  const parallaxItems = body.querySelectorAll('*[data-parallax]') as NodeListOf<Element>

  parallaxItems.forEach((element: Element): void => {

    const parallaxItem = element as HTMLElement

    if (!parallaxItem) return

    const parallaxToScroll = (): void => {

      if (parallaxItem.dataset.parallax == 'scroll') {

        const depth: number = parallaxItem.dataset.parallaxDepth ? Number(parallaxItem.dataset.parallaxDepth) / 10 : 0.02
        const position: number = scrolledPage.init().top * depth

        if (parallaxItem.hasAttribute('data-reverse')) {

          parallaxItem.style.transform = `translate3d(0, -${position}px, 0)`

        } else {

          parallaxItem.style.transform = `translate3d(0, ${position}px, 0)`

        }

        window.requestAnimationFrame(parallaxToScroll)

      }

    }

    body.addEventListener('mousemove', ((event: MouseEvent): void => {

      const coordinates: coordinates = {

        top: event.clientY / window.innerHeight,
        left: event.clientX / window.innerWidth

      }

      if (parallaxItem.dataset.parallax == 'layer') {

        parallaxItem.style.setProperty('--y', `${coordinates.top}px`)
        parallaxItem.style.setProperty('--x', `${coordinates.left}px`)

      }

    }) as EventListener)

    window.requestAnimationFrame(parallaxToScroll)

  })

}

export default { init }
import { scrolledPage } from './functions/scrolled-page'
import { media } from './functions/media'

const setScrollingHeight = (): void => {
  const scrollings = document.querySelectorAll('*[data-scrolling]') as NodeListOf<Element>

  scrollings.forEach((element: Element): void => {
    const scrolling = element as HTMLElement

    if (!scrolling) return

    const horizontal = scrolling.querySelector('*[data-scrolling-horizontal]') as HTMLElement
    const height: number = (horizontal.scrollWidth - horizontal.clientWidth) * 1.2

    scrolling.style.setProperty('--scroll-height', `${height}px`)
  })
}

const setHorizontalScrolling = (): void => {
  const scrollings = document.querySelectorAll('*[data-scrolling]') as NodeListOf<Element>

  scrollings.forEach((element: Element): void => {
    const scrolling = element as HTMLElement

    if (!scrolling) return

    const horizontal = scrolling.querySelector('*[data-scrolling-horizontal]') as HTMLElement
    const images = scrolling.querySelectorAll('*[data-scrolling-image]') as NodeListOf<Element>
    const offsetTop: number = scrolledPage().top
    const moving: number = (horizontal.scrollLeft / (horizontal.scrollWidth - horizontal.clientWidth)) * 20

    horizontal.scrollLeft = offsetTop - scrolling.offsetTop

    images.forEach((element: Element): void => {
      const image = element as HTMLImageElement

      if (!image) return

      image.style.setProperty('--scroll-moving', `-${moving}%`)
    })
  })
}

const scrollingInViewport = (): void => {
  switch ((document.documentElement as HTMLElement).clientWidth < media.md) {
  case true: {
    document.removeEventListener('wheel', setHorizontalScrolling as EventListener)
    document.removeEventListener('scroll', setHorizontalScrolling as EventListener)
    break
  }

  case false: {
    document.addEventListener('wheel', setHorizontalScrolling as EventListener)
    document.addEventListener('scroll', setHorizontalScrolling as EventListener)
    break
  }
  }
}

export default (): void => {
  setScrollingHeight()
  setHorizontalScrolling()
  scrollingInViewport()
  window.addEventListener('resize', setScrollingHeight as EventListener)
  window.addEventListener('resize', scrollingInViewport as EventListener)
}

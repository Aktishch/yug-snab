import { coordinates } from './functions/coordinates'
import { scrolledPage } from './functions/scrolled-page'

const setOffset = (element: HTMLElement): coordinates => {
  const coordinates: coordinates = {
    top: element.getBoundingClientRect().top + scrolledPage().top,
    left: element.getBoundingClientRect().left + scrolledPage().left,
  }

  return coordinates
}

export const animation = (): void => {
  const items = document.querySelectorAll('*[data-anim]') as NodeListOf<Element>

  items.forEach((element: Element): void => {
    const item = element as HTMLElement

    if (!item) return

    const height: number = item.offsetHeight
    const offsetTop: number = setOffset(item).top
    const screenPosition = 3
    let point: number = window.innerHeight - height / screenPosition

    if (point > window.innerHeight) point = window.innerHeight - window.innerHeight / screenPosition

    if (scrolledPage().top > offsetTop - point && scrolledPage().top < offsetTop + height) item.dataset.anim = 'show'
  })
}

export default (): void => {
  animation()
  document.addEventListener('scroll', animation as EventListener)
}

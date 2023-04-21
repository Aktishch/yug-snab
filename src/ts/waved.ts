import { coordinates } from './functions/coordinates'
import touchDevice from './functions/touch-device'

const setWaved = (event: Event): void => {

  const item = (event.target as HTMLElement).closest('[data-waved]') as HTMLElement
  const waved = item.querySelector('.waved') as HTMLDivElement
  const circle = document.createElement('div') as HTMLDivElement

  const createCircle = (yPos: number, xPos: number): void => {

    const coordinates: coordinates = {

      top: yPos - item.getBoundingClientRect().top,
      left: xPos - item.getBoundingClientRect().left

    }

    circle.classList.add('waved-circle')
    circle.style.top = `${coordinates.top}px`
    circle.style.left = `${coordinates.left}px`

    waved.appendChild(circle)

    setTimeout((): void => circle.remove(), 1000)

  }

  if (event.type === 'touchstart' && touchDevice.init()) {

    createCircle((event as TouchEvent).touches[0].clientY, (event as TouchEvent).touches[0].clientX)

  }

  if (event.type === 'mousedown' && !touchDevice.init()) {

    createCircle((event as MouseEvent).clientY, (event as MouseEvent).clientX)

  }

}

const init = (): void => {

  const items = document.querySelectorAll('*[data-waved]') as NodeListOf<Element>

  items.forEach((element: Element): void => {

    const item = element as HTMLElement

    if (!item) return

    const waved = document.createElement('div') as HTMLDivElement

    waved.classList.add('waved')
    item.appendChild(waved)

    item.addEventListener('touchstart', setWaved as EventListener)
    item.addEventListener('mousedown', setWaved as EventListener)

  })

}

export default { init }
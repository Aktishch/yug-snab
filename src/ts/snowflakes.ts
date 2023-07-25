import { coordinates } from './functions/coordinates'
import touchDevice from './functions/touch-device'

const init = (): void => {
  const snow = document.querySelector('*[data-snow]') as HTMLElement

  if (!snow || touchDevice.init()) return

  let flag = true

  const createSnowflake = (event: MouseEvent): void => {
    if (!flag) return

    flag = false
    setTimeout((): boolean => (flag = true), 300)

    const snowflake = document.createElement('span') as HTMLSpanElement
    const size: number = Math.random() * 60
    const coordinates: coordinates = {
      top: event.clientY,
      left: event.clientX,
    }

    snowflake.classList.add('snowflake')
    snowflake.style.width = `${20 + size}px`
    snowflake.style.height = `${20 + size}px`
    snowflake.style.top = `${coordinates.top}px`
    snowflake.style.left = `${coordinates.left}px`
    snow.appendChild(snowflake)
    setTimeout((): void => snowflake.remove(), 3000)
  }

  document.addEventListener('mousemove', createSnowflake as EventListener)
}

export default { init }

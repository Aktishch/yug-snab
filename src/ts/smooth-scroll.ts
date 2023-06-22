import touchDevice from './functions/touch-device'
import scrolledPage from './functions/scrolled-page'
import animation from './animation'

const init = (): void => {
  const smoothWrapper = document.querySelector('#smooth-wrapper') as HTMLElement

  if (!smoothWrapper || touchDevice.init()) return

  const html = document.documentElement as HTMLElement
  const body = document.body as HTMLBodyElement

  let offset = 0
  let speed = 1

  setTimeout((): void => {
    speed = 0.04
  }, 500)

  html.classList.add('overflow-x-hidden')
  body.classList.add('overflow-hidden')
  smoothWrapper.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'overflow-hidden')

  const smoothScroll = (): void => {
    const height = smoothWrapper.getBoundingClientRect().height - 1

    body.style.height = `${Math.floor(height)}px`
    offset += (scrolledPage.init().top - offset) * speed
    smoothWrapper.style.transform = `translateY(-${offset}px)`

    window.requestAnimationFrame(smoothScroll)

    animation.init()
  }

  window.requestAnimationFrame(smoothScroll)
}

export default { init }

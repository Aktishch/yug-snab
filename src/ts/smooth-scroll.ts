import touchDevice from './functions/touch-device'
import scrolledPage from './functions/scrolled-page'
import animation from './animation'

const init = (): void => {
  const smoothWrapper = document.querySelector('#smooth-wrapper') as HTMLElement

  if (!smoothWrapper || touchDevice.init()) return

  const html = document.documentElement as HTMLElement
  const body = document.body as HTMLBodyElement

  let offset = 0
  let speed = 0.04

  const setBodyHeight = (): void => {
    const height: number = smoothWrapper.getBoundingClientRect().height - 1

    body.style.height = `${Math.floor(height)}px`
  }

  const smoothScroll = (): void => {
    setBodyHeight()

    offset += (scrolledPage.init().top - offset) * speed

    const translateY = `translateY(-${offset}px)`

    smoothWrapper.style.transform = translateY

    sessionStorage.setItem('translateY', translateY)

    animation.onScroll()

    window.requestAnimationFrame(smoothScroll)
  }

  if (performance.navigation.type == 1 && sessionStorage.getItem('translateY')) {
    setBodyHeight()

    speed = 1
    smoothWrapper.style.transform = String(sessionStorage.getItem('translateY'))

    setTimeout((): void => {
      speed = 0.04
    }, 500)
  }

  html.classList.add('overflow-x-hidden')
  body.classList.add('overflow-hidden')
  smoothWrapper.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'overflow-hidden')

  window.requestAnimationFrame(smoothScroll)

  // let fff = 0

  // const scrollSticky = (): void => {
  //   const articles = document.querySelector('.articles') as HTMLElement

  //   fff += (scrolledPage.init().top - articles.offsetTop - fff) * speed

  //   if (fff > 0 && fff < articles.offsetHeight + articles.offsetTop) {
  //     articles.style.transform = `translateY(${fff}px)`
  //   }

  //   window.requestAnimationFrame(scrollSticky)
  // }

  // window.requestAnimationFrame(scrollSticky)
}

export default { init }

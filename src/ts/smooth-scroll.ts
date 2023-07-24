import touchDevice from './functions/touch-device'
import scrolledPage from './functions/scrolled-page'
import animation from './animation'

const init = (): void => {
  const smoothScroll = document.querySelector('#smooth-scroll') as HTMLElement

  if (!smoothScroll || touchDevice.init()) return

  const html = document.documentElement as HTMLElement
  const body = document.body as HTMLBodyElement
  const wrappers = smoothScroll.querySelectorAll('*[data-smooth-wrapper]') as NodeListOf<Element>
  const scrollSpeed: number = smoothScroll.dataset.smoothSpeed ? Number(smoothScroll.dataset.smoothSpeed) / 100 : 0.02

  let offset = 0
  let speed: number = scrollSpeed

  const setBodyHeight = (): void => {
    const height: number = smoothScroll.getBoundingClientRect().height - 1

    body.style.height = `${Math.floor(height)}px`
  }

  const createSmoothScroll = (): void => {
    setBodyHeight()

    offset += (scrolledPage.init().top - offset) * speed

    const translateY = `translateY(-${offset}px)`

    smoothScroll.style.transform = translateY

    sessionStorage.setItem('translateY', translateY)

    animation.onScroll()

    window.requestAnimationFrame(createSmoothScroll)
  }

  if (performance.navigation.type == 1 && sessionStorage.getItem('translateY')) {
    setBodyHeight()

    speed = 1
    smoothScroll.style.transform = String(sessionStorage.getItem('translateY'))

    setTimeout((): void => {
      speed = scrollSpeed
    }, 500)
  }

  html.classList.add('overflow-x-hidden')
  body.classList.add('overflow-hidden')
  smoothScroll.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'overflow-hidden')

  window.requestAnimationFrame(createSmoothScroll)

  wrappers.forEach((element: Element): void => {
    const wrapper = element as HTMLElement

    if (!wrapper) return

    const layers = wrapper.querySelectorAll('*[data-smooth-layer]') as NodeListOf<Element>

    layers.forEach((element: Element): void => {
      const layer = element as HTMLElement

      if (!layer) return

      let position = 0

      const createSmoothLayer = (): void => {
        if (
          wrapper.getBoundingClientRect().top - window.screen.height <= 0 &&
          scrolledPage.init().top < wrapper.offsetTop + wrapper.offsetHeight
        ) {
          const layerSpeed: number = layer.dataset.smoothSpeed ? Number(layer.dataset.smoothSpeed) / 100 : 0.02

          position += (scrolledPage.init().top - wrapper.offsetTop - position) * layerSpeed

          if (layer.dataset.smoothLayer == 'top') {
            layer.style.transform = `translateY(${-position}px)`
          } else if (layer.dataset.smoothLayer == 'bottom') {
            layer.style.transform = `translateY(${position}px)`
          } else if (layer.dataset.smoothLayer == 'left') {
            layer.style.transform = `translateX(${-position}px)`
          } else if (layer.dataset.smoothLayer == 'right') {
            layer.style.transform = `translateX(${position}px)`
          }
        }

        window.requestAnimationFrame(createSmoothLayer)
      }

      window.requestAnimationFrame(createSmoothLayer)
    })
  })

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

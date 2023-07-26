import touchDevice from './functions/touch-device'
import scrolledPage from './functions/scrolled-page'
import animation from './animation'

const init = (): void => {
  const smoothScroll = document.querySelector('#smooth-scroll') as HTMLElement

  if (!smoothScroll || touchDevice.init()) return

  const html = document.documentElement as HTMLElement
  const body = document.body as HTMLBodyElement
  const wrappers = smoothScroll.querySelectorAll('*[data-smooth-wrapper]') as NodeListOf<Element>
  const speed: number = smoothScroll.dataset.smoothSpeed ? Number(smoothScroll.dataset.smoothSpeed) / 100 : 0.02
  let smoothSpeed: number = speed
  let offset = 0

  const setBodyHeight = (): void => {
    const height: number = smoothScroll.getBoundingClientRect().height - 1

    body.style.height = `${Math.floor(height)}px`
  }

  const createSmoothScroll = (): void => {
    setBodyHeight()
    offset += (scrolledPage.init().top - offset) * smoothSpeed

    const translateY = `translateY(-${offset}px)`

    smoothScroll.style.transform = translateY
    sessionStorage.setItem('translateY', translateY)
    animation.onScroll()
    window.requestAnimationFrame(createSmoothScroll)
  }

  if (performance.navigation.type === 1 && sessionStorage.getItem('translateY')) {
    setBodyHeight()
    smoothSpeed = 1
    smoothScroll.style.transform = String(sessionStorage.getItem('translateY'))

    setTimeout((): void => {
      smoothSpeed = speed
    }, 500)
  }

  html.classList.add('overflow-x-hidden')
  body.classList.add('overflow-hidden')
  smoothScroll.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'overflow-hidden')

  window.requestAnimationFrame(createSmoothScroll)

  wrappers.forEach((element: Element): void => {
    const wrapper = element as HTMLElement

    if (!wrapper) return

    const stickys = wrapper.querySelectorAll('*[data-smooth-sticky]') as NodeListOf<Element>
    const layers = wrapper.querySelectorAll('*[data-smooth-layer]') as NodeListOf<Element>

    stickys.forEach((element: Element): void => {
      const sticky = element as HTMLElement

      if (!sticky) return

      let stickyPosition = 0

      const createSmothSticky = (): void => {
        if (
          wrapper.getBoundingClientRect().top < 0 &&
          scrolledPage.init().top < wrapper.offsetTop + wrapper.offsetHeight
        ) {
          stickyPosition += (scrolledPage.init().top - wrapper.offsetTop - stickyPosition) * speed
          sticky.style.transform = `translateY(${stickyPosition}px)`
        }

        window.requestAnimationFrame(createSmothSticky)
      }

      window.requestAnimationFrame(createSmothSticky)
    })

    layers.forEach((element: Element): void => {
      const layer = element as HTMLElement

      if (!layer) return

      const layerSpeed: number = layer.dataset.smoothSpeed ? Number(layer.dataset.smoothSpeed) / 100 : 0.02
      const layerDepth: number = layer.dataset.smoothDepth ? Number(layer.dataset.smoothDepth) : 1
      let layerPosition = 0

      const createSmoothLayer = (): void => {
        if (
          wrapper.getBoundingClientRect().top - window.screen.height <= 0 &&
          scrolledPage.init().top < wrapper.offsetTop + wrapper.offsetHeight
        ) {
          layerPosition += (scrolledPage.init().top - wrapper.offsetTop - layerPosition) * layerSpeed

          switch (layer.dataset.smoothLayer) {
          case 'top': {
            layer.style.transform = `translateY(${-layerPosition / layerDepth}px)`
            break
          }

          case 'bottom': {
            layer.style.transform = `translateY(${layerPosition / layerDepth}px)`
            break
          }

          case 'left': {
            layer.style.transform = `translateX(${-layerPosition / layerDepth}px)`
            break
          }

          case 'right': {
            layer.style.transform = `translateX(${layerPosition / layerDepth}px)`
            break
          }
          }
        }

        window.requestAnimationFrame(createSmoothLayer)
      }

      window.requestAnimationFrame(createSmoothLayer)
    })
  })
}

export default { init }

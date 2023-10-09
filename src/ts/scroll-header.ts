import { scrolledPage } from './functions/scrolled-page'

export default (): void => {
  const header = document.querySelector('*[data-header]') as HTMLElement

  if (!header) return

  let prevOffsetTop: number = scrolledPage().top

  const scrollHeader = (): void => {
    const currentOffsetTop: number = scrolledPage().top
    const headerHeight: number = header.offsetHeight

    prevOffsetTop > currentOffsetTop
      ? header.style.setProperty('--top', '0')
      : header.style.setProperty('--top', `-${headerHeight}px`)

    prevOffsetTop = currentOffsetTop
  }

  document.addEventListener('scroll', scrollHeader as EventListener)

  const smoothScroll = document.querySelector('#smooth-scroll') as HTMLElement

  if (smoothScroll) {
    const wrapperResize = (): void => {
      smoothScroll.style.paddingTop = `${header.offsetHeight}px`
    }

    wrapperResize()
    window.addEventListener('resize', wrapperResize as EventListener)
  }
}

import { scrolledPage } from './functions/scrolled-page'

export default (): void => {
  const header = document.querySelector('*[data-header]') as HTMLElement

  if (!header) return

  let prevOffsetTop: number = scrolledPage().top

  const scrollHeader = (): void => {
    const currentOffsetTop: number = scrolledPage().top

    if (header.offsetHeight < currentOffsetTop) {
      prevOffsetTop > currentOffsetTop
        ? header.classList.remove('-translate-y-full')
        : header.classList.add('-translate-y-full')
    }

    prevOffsetTop = currentOffsetTop
  }

  document.addEventListener('scroll', scrollHeader as EventListener)
}

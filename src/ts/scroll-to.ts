import scrolledPage from './functions/scrolled-page'

const scrollTo = (event: Event): void => {
  event.preventDefault()

  const link = event.target as HTMLAnchorElement
  const id = String(link.getAttribute('href'))
  const block = document.querySelector(id) as HTMLElement

  if (link.dataset.scroll == 'top') {
    const header = document.querySelector('*[data-header]') as HTMLElement

    let offsetTop: number

    if (header) {
      offsetTop = block.getBoundingClientRect().top + scrolledPage.init().top - header.offsetHeight
    } else {
      offsetTop = block.getBoundingClientRect().top + scrolledPage.init().top
    }

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })
  }

  if (link.dataset.scroll == 'center') {
    block.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    })
  }
}

const init = (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLElement).hasAttribute('data-scroll')) scrollTo(event)
  }) as EventListener)
}

export default { init }

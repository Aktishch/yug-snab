import scrolledPage from './functions/scrolled-page'

const scrollTo = (event: Event): void => {
  event.preventDefault()

  const link = event.target as HTMLAnchorElement
  const id = String(link.getAttribute('href'))
  const block = document.querySelector(id) as HTMLElement

  switch (link.dataset.scroll) {
  case 'top': {
    const header = document.querySelector('*[data-header]') as HTMLElement
    const offsetTop: number = header
      ? block.getBoundingClientRect().top + scrolledPage.init().top - header.offsetHeight
      : block.getBoundingClientRect().top + scrolledPage.init().top

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })

    break
  }

  case 'center': {
    block.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    })

    break
  }
  }
}

const init = (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLElement).hasAttribute('data-scroll')) scrollTo(event)
  }) as EventListener)
}

export default { init }

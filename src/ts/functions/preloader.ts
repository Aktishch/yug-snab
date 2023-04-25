import scrollbar from './scrollbar'

const loaded = (): void => {

  const preloader = document.querySelector('*[data-preloader]') as HTMLElement

  if (!preloader) return

  scrollbar.hidden()

}

const load = (): void => {

  const preloader = document.querySelector('*[data-preloader]') as HTMLElement

  if (!preloader) return

  preloader.classList.add('invisible', 'opacity-0')

  setTimeout((): void => {

    scrollbar.show()
    preloader.remove()

  }, 500)

}

export default { loaded, load }
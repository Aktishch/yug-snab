import scrollbar from './scrollbar'

const loaded = (): void => {

  scrollbar.hidden()

}

const load = (): void => {

  const preloader = document.querySelector('*[data-preloader]') as HTMLElement

  preloader.classList.add('invisible', 'opacity-0')


  setTimeout((): void => {

    scrollbar.show()
    preloader.remove()

  }, 500)

}

export default { loaded, load }
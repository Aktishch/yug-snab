const init = (): void => {
  const preloader = document.querySelector('*[data-preloader]') as HTMLElement

  if (!preloader) return

  preloader.classList.add('invisible', 'opacity-0')

  setTimeout((): void => preloader.remove(), 500)
}

export default { init }

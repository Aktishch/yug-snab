const setBubbles = (event: Event): void => {
  const btn = event.target as HTMLElement

  btn.dataset.bubles = 'show'
  btn.classList.add('pointer-events-none')

  setTimeout((): void => {
    btn.dataset.bubles = 'hidden'
    btn.classList.remove('pointer-events-none')
  }, 600)
}

const init = (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLElement).closest('[data-bubbles]')) setBubbles(event)
  }) as EventListener)
}

export default { init }

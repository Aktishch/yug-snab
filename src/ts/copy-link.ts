const copyLink = (event: Event): void => {
  const copy = (event.target as HTMLButtonElement).closest('[data-copy]') as HTMLElement
  const input = copy.querySelector('*[data-copy-input]') as HTMLInputElement

  setTimeout((): void => {
    input.select()
    document.execCommand('copy')
  }, 100)
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-copy-button]')) copyLink(event)
  }) as EventListener)
}

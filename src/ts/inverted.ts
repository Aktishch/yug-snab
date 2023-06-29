const init = (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-inverted-open]')) {
      const inverted = (event.target as HTMLButtonElement).closest('[data-inverted]') as HTMLElement

      inverted.dataset.inverted = 'after'
    }
  }) as EventListener)

  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-inverted-close]')) {
      const inverted = (event.target as HTMLButtonElement).closest('[data-inverted]') as HTMLElement

      inverted.dataset.inverted = 'before'
    }
  }) as EventListener)
}

export default { init }

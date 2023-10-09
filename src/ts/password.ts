const visibilityPassword = (event: Event): void => {
  const label = (event.target as HTMLElement).closest('[data-label]') as HTMLElement
  const input = label.querySelector('*[data-input="password"]') as HTMLInputElement
  const password = label.querySelector('*[data-password]') as HTMLElement
  const icon = password.querySelector('use') as SVGUseElement
  const src: string = password.dataset.password || ''

  switch (input.type) {
  case 'password': {
    input.type = 'text'
    icon.setAttribute('xlink:href', `${src}img/icons.svg#eye-hidden`)
    break
  }

  case 'text': {
    input.type = 'password'
    icon.setAttribute('xlink:href', `${src}img/icons.svg#eye-visible`)
    break
  }
  }
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLElement).closest('[data-password]')) visibilityPassword(event)
  }) as EventListener)
}

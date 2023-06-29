const visibilityPassword = (event: Event): void => {
  const wrapper = (event.target as HTMLElement).closest('[data-form-wrapper]') as HTMLElement
  const input = wrapper.querySelector('*[data-input="password"]') as HTMLInputElement
  const icon = wrapper.querySelector('*[data-password] use') as SVGUseElement

  if (input.type === 'password') {
    input.type = 'text'
    icon.setAttribute('xlink:href', 'img/icons.svg#eye-hidden')
  } else {
    input.type = 'password'
    icon.setAttribute('xlink:href', 'img/icons.svg#eye-visible')
  }
}

const init = (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLElement).closest('[data-password]')) visibilityPassword(event)
  }) as EventListener)
}

export default { init }

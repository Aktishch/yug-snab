const inputName = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const regExp = /[0-9.,!@#$%^&*()-=_+`~{}/?<>|'"]/

  if (input.value.match(regExp)) input.value = input.value.replace(regExp, '')
}

export default (): void => {
  document.addEventListener('input', ((event: Event): void => {
    if ((event.target as HTMLElement).getAttribute('data-input') === 'name') inputName(event)
  }) as EventListener)
}

const init = (): void => {
  const html = document.documentElement as HTMLElement
  const toggles = html.querySelectorAll('*[data-theme="toggle"]') as NodeListOf<Element>

  let theme = 'light'

  const togglesChecked = (check: boolean): void => {
    toggles.forEach((element: Element): void => {
      const toggle = element as HTMLInputElement

      toggle.checked = check
    })
  }

  const variationTheme = (): void => {
    if (!html.classList.contains('dark')) {
      theme = 'dark'
      localStorage.setItem('theme', theme)
      html.classList.add('dark')

      togglesChecked(true)
    } else {
      theme = 'light'
      localStorage.setItem('theme', theme)
      html.classList.remove('dark')

      togglesChecked(false)
    }
  }

  if (localStorage.getItem('theme')) {
    theme = String(localStorage.getItem('theme'))

    if (theme == 'dark') {
      html.classList.add('dark')

      togglesChecked(true)
    } else {
      html.classList.remove('dark')

      togglesChecked(false)
    }
  }

  toggles.forEach((element: Element): void => {
    const toggle = element as HTMLInputElement

    toggle.addEventListener('click', variationTheme as EventListener)
  })

  document.addEventListener('keyup', ((event: KeyboardEvent): void => {
    if (event.altKey && event.code == 'Digit5') variationTheme()
  }) as EventListener)
}

export default { init }

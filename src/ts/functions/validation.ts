export const validation = (form: HTMLFormElement): boolean => {
  const labels = form.querySelectorAll('*[data-label="input"]') as NodeListOf<Element>
  let validate = true

  labels.forEach((element: Element): void => {
    const label = element as HTMLLabelElement

    if (!label) return

    const inputs = label.querySelectorAll('*[data-input]') as NodeListOf<Element>
    const error = label.querySelector('*[data-error]') as HTMLElement

    inputs.forEach((element: Element): void => {
      const input = element as HTMLInputElement

      if (!input && !error) return

      const inputError = (): void => {
        input.focus()
        input.classList.add('input-error')
        error.classList.add('visible', 'opacity-100')
        validate = false
      }

      const maxLengthInputTel = (numb: number): void => {
        if (input.value.length > 0 && input.value.length < numb) {
          error.innerText = 'Введите корректный номер!'
          inputError()
        }
      }

      if (input.value === null || input.value === '' || input.value.length === 0) {
        inputError()
      } else {
        input.classList.remove('input-error')
        error.classList.remove('visible', 'opacity-100')
      }

      switch (input.dataset.input) {
      case 'name': {
        if (input.value.length === 1) inputError()
        break
      }

      case 'tel': {
        switch (input.value[0]) {
        case '8': {
          maxLengthInputTel(17)
          break
        }

        case '+': {
          maxLengthInputTel(18)
          break
        }

        default: {
          error.innerText = 'Пожалуйста, введите ваш номер!'
          break
        }
        }

        break
      }
      }

      input.addEventListener(
        'input',
        ((): void => {
          if (input.value.length > 0) {
            input.classList.remove('input-error')
            error.classList.remove('visible', 'opacity-100')
          }
        }) as EventListener,
        { once: true }
      )
    })
  })

  return validate
}

import { dialogOpen, dialogNotClosing, dialogClose } from './fancybox'
import { validation } from './functions/validation'

const submitHandler = (event: Event): void => {
  const form = event.target as HTMLFormElement

  switch (form.dataset.form) {
  case 'action': {
    if (!validation(form)) event.preventDefault()
    break
  }

  case 'submit': {
    event.preventDefault()

    if (!validation(form)) return

    const formData: FormData = new FormData(form)
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
    const requestUrl = './ajax/submit-handler.php'

    submitBtn.setAttribute('disabled', 'disabled')
    dialogNotClosing('./dialogs/dialog-preloader.php')

    fetch(requestUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response: Response): any => {
        return response.json()
      })
      .then((response: Response): void => {
        dialogClose()

        switch (response.status) {
        case true: {
          dialogOpen('./dialogs/dialog-success.php')
          break
        }

        case false: {
          dialogOpen('./dialogs/dialog-error.php')
          break
        }
        }

        form.reset()
        submitBtn.removeAttribute('disabled')
      })
      .catch((error: string): void => console.log('The form has not been sent', error))

    break
  }
  }
}

export default (): void => {
  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form')) submitHandler(event)
  }) as EventListener)
}

import { dialogOpen, dialogNotClosing, dialogClose } from './fancybox'
import { validation } from './functions/validation'

const submitHandler = (event: Event, data: File[]): void => {
  const form = event.target as HTMLFormElement

  switch (form.dataset.form) {
  case 'action': {
    if (!validation(form)) event.preventDefault()
    break
  }

  default: {
    event.preventDefault()

    if (!validation(form)) return

    const formData: FormData = new FormData(form)
    const searchParams = new URLSearchParams() as URLSearchParams
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
    let requestUrl = ''

    for (const pair of formData.entries()) {
      searchParams.append(pair[0], String(pair[1]))
    }

    if (form.hasAttribute('data-files')) {
      if (data !== null) for (let i = 0; i < data.length; i++) formData.append('file[]', data[i])
    }

    const queryString: string = searchParams.toString()

    switch (form.dataset.form) {
    case 'submit': {
      requestUrl = './ajax/submit-handler.php'
      submitBtn.setAttribute('disabled', 'disabled')
      dialogNotClosing('./dialogs/dialog-preloader.html')

      fetch(requestUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response: Response): void => {
          response.text()
        })
        .then((): void => {
          dialogClose()
          dialogOpen('./dialogs/dialog-submit.html')
          form.reset()
          submitBtn.removeAttribute('disabled')

          if (form.hasAttribute('data-files')) {
            const listing = form.querySelector('*[data-files-listing]') as HTMLElement
            const text = form.querySelector('*[data-files-text]') as HTMLElement

            listing.innerHTML = ''
            listing.classList.remove('mb-5')
            text.innerHTML = 'Загрузить файлы'
            data.length = 0
          }
        })
        .catch((error: string): void => console.log('The form has not been sent', error))
      break
    }

    case 'params': {
      requestUrl = `./dialogs/dialog-authorization.html?${queryString}`
      dialogClose()
      dialogOpen(requestUrl)
      break
    }
    }

    break
  }
  }
}

export default (data: File[]): void => {
  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form')) submitHandler(event, data)
  }) as EventListener)
}

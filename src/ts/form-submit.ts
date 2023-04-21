import formValidate from './functions/form-validate'
import dialog from './functions/dialog'

const formSubmit = (event: Event): void => {

  event.preventDefault()

  const form = event.target as HTMLFormElement

  if (!formValidate.init(form)) return

  const formData: FormData = new FormData(form)
  const queryString: string = new URLSearchParams(formData as URLSearchParams).toString()
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement

  let requestUrl: string = ''

  if (form.dataset.form == 'submit') {

    requestUrl = '/ajax/submit-handler.php'
    submitBtn.setAttribute('disabled', 'disabled')

    dialog.loading()

    fetch(requestUrl, {

      method: 'POST',
      body: formData

    }).then((response: Response): any => {

      return response.text()

    }).then((response: any): void => {

      dialog.close()

      dialog.open('/dialogs/dialog-submit.html')

      form.reset()

      submitBtn.removeAttribute('disabled')

    }).catch((error: string): void =>

      console.log('The form has not been sent', error)

    )

  }

  if (form.dataset.form == 'params') {

    requestUrl = `/dialogs/dialog-authorization.html?${queryString}`

    dialog.close()

    dialog.open(requestUrl)

  }

}

const init = (): void => {

  document.addEventListener('submit', ((event: Event): void => {

    if ((event.target as HTMLFormElement).hasAttribute('data-form')) formSubmit(event)

  }) as EventListener)

}

export default { init }
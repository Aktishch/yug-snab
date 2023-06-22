import fancybox from './fancybox'
import formValidate from './functions/form-validate'

const formSubmit = (event: Event, data: File[]): void => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  if (!formValidate.init(form)) return

  const formData: FormData = new FormData(form)
  const queryString: string = new URLSearchParams(formData as URLSearchParams).toString()
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement

  let requestUrl = ''

  if (form.dataset.form == 'submit') {
    if (form.hasAttribute('data-files')) {
      if (data != null) for (let i = 0; i < data.length; i++) formData.append('file[]', data[i])
    }

    requestUrl = './ajax/submit-handler.php'
    submitBtn.setAttribute('disabled', 'disabled')

    fancybox.preloader()

    fetch(requestUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response: Response): any => {
        return response.text()
      })
      .then((response: any): void => {
        fancybox.close()

        fancybox.open('./dialogs/dialog-submit.html')

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
  }

  if (form.dataset.form == 'params') {
    requestUrl = `./dialogs/dialog-authorization.html?${queryString}`

    fancybox.close()

    fancybox.open(requestUrl)
  }
}

const init = (data: File[]): void => {
  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form')) formSubmit(event, data)
  }) as EventListener)
}

export default { init }

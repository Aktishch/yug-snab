import fancybox from './fancybox'
import fileHandler from './functions/file-handler'

const choiceFile = (event: Event): void => {
  const form = (event.target as HTMLInputElement).closest('[data-form]') as HTMLFormElement
  const download = form.querySelector('*[data-label="download"]') as HTMLElement
  const input = event.target as HTMLInputElement
  const error = download.querySelector('*[data-error]') as HTMLElement
  const image = download.querySelector('*[data-file="image"]') as HTMLImageElement

  if (!image) return

  const file = (input.files as FileList)[0] as File
  const readFile = new FileReader() as FileReader

  file ? readFile.readAsDataURL(file) : (image.src = '')

  readFile.addEventListener('loadend', ((): void => {
    if (fileHandler.init(input, error)) {
      image.src = String(readFile.result)

      if (form.dataset.form == 'avatar') {
        const formData: FormData = new FormData(form)
        const requestUrl = './ajax/submit-handler.php'
        const avatar = document.querySelector('*[data-avatar]') as HTMLImageElement

        fancybox.preloader()

        fetch(requestUrl, {
          method: 'POST',
          body: formData,
        })
          .then((response: Response): any => {
            return response.text()
          })
          .then((response: any): void => {
            avatar.src = String(readFile.result)

            fancybox.close()
          })
          .catch((error: string): void => console.log('The form has not been sent', error))
      } else {
        return
      }
    }
  }) as EventListener)
}

const init = (): void => {
  document.addEventListener('change', ((event: Event): void => {
    if ((event.target as HTMLInputElement).getAttribute('data-input') == 'file') choiceFile(event)
  }) as EventListener)
}

export default { init }

import fileHandler from './functions/file-handler'

const init = (): void => {
  const dragEvents: string[] = ['dragenter', 'dragover', 'dragleave', 'drop']

  dragEvents.forEach((dragEvent): void => {
    document.addEventListener(dragEvent, ((event: DragEvent): void => {
      if ((event.target as HTMLElement).closest('[data-drag]')) {
        event.preventDefault()

        const form = (event.target as HTMLElement).closest('[data-form]')

        if (!form) return

        const download = form.querySelector('*[data-label="download"]') as HTMLElement
        const drag = (event.target as HTMLElement).closest('[data-drag]') as HTMLElement
        const input = download.querySelector('*[data-input="file"]') as HTMLInputElement
        const error = download.querySelector('*[data-error]') as HTMLElement
        const image = download.querySelector('*[data-file="image"]') as HTMLImageElement

        if (event.type === 'dragenter') {
          drag.classList.add('bg-opacity-50')
        } else if (event.type === 'dragleave') {
          drag.classList.remove('bg-opacity-50')
        } else if (event.type === 'drop') {
          const files = (event.dataTransfer as DataTransfer).files as FileList

          drag.classList.remove('bg-opacity-50')
          input.files = files

          if (fileHandler.init(input, error)) {
            const file: File = (input.files as FileList)[0]
            const readFile: FileReader = new FileReader()

            file ? readFile.readAsDataURL(file) : (image.src = '')

            readFile.addEventListener('loadend', ((): void => {
              image.src = String(readFile.result)
            }) as EventListener)
          }
        }
      }
    }) as EventListener)
  })
}

export default { init }

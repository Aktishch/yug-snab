import fileHandler from './functions/file-handler'

const init = (): void => {

  const dragEvents: string[] = ['dragenter', 'dragover', 'dragleave', 'drop']

  dragEvents.forEach((dragEvent): void => {

    document.addEventListener(dragEvent, ((event: Event) => {

      if ((event.target as HTMLElement).closest('[data-drag]')) {

        event.preventDefault()

        const form = (event.target as HTMLElement).closest('[data-form]')

        if (!form) return

        const download = form.querySelector('*[data-label="download"]') as HTMLElement
        const input = download.querySelector('*[data-input="file"]') as HTMLInputElement
        const error = download.querySelector('*[data-error]') as HTMLElement
        const image = download.querySelector('*[data-file="image"]') as HTMLImageElement

        if (event.type === 'dragenter') {

          console.log('1');

        } else if (event.type === 'dragover') {

          console.log('2');

        } else if (event.type === 'dragleave') {

          console.log('3');

        } else if (event.type === 'drop') {

          const files = (event as any).dataTransfer.files as FileList

          input.files = files
          if (fileHandler.init(input, error)) {
            console.log(input.files);
          }
          // if (fileHandler.init(input, error)) {
          //   input.files = files
          //   console.log(input.files);
            
          // }

        }

      }

    }) as EventListener)

  })

}

export default { init }
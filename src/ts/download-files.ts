import { fileHandler } from './functions/file-handler'

export default (): File[] => {
  const data: File[] = []

  document.addEventListener('change', ((event: Event): void => {
    if ((event.target as HTMLInputElement).getAttribute('data-input') === 'file') {
      const form = (event.target as HTMLInputElement).closest('[data-files]') as HTMLFormElement

      if (!form) return

      const download = form.querySelector('*[data-label="download"]') as HTMLLabelElement
      const input = event.target as HTMLInputElement
      const files = input.files as FileList
      const text = download.querySelector('*[data-files-text]') as HTMLElement
      const error = download.querySelector('*[data-error]') as HTMLElement
      const listing = form.querySelector('*[data-files-listing]') as HTMLElement
      const item = document.createElement('li') as HTMLElement

      item.classList.add('flex', 'items-center', 'justify-between', 'gap-5')

      if (fileHandler(input, error)) {
        for (let i = 0; i < files.length; i++) {
          data.push(files[i])
          item.setAttribute('data-files-item', '')
          item.innerHTML = `
            <span class="truncate">${files[i].name}</span>
            <button class="btn btn-gray text-14 p-1" data-files-remove="${files[i].name}" type="button">
              <svg class="icon">
                <use xlink:href="img/icons.svg#close"></use>
              </svg>
            </button>`
          listing.appendChild(item)

          if (!listing.classList.contains('mb-5')) listing.classList.add('mb-5')

          switch (data.length) {
          case 3: {
            download.classList.add('pointer-events-none', 'opacity-50')
            text.innerText = 'Не более 3 файлов'
            break
          }

          default: {
            text.innerText = 'Добавить еще'
            break
          }
          }
        }
      }
    }
  }) as EventListener)

  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-files-remove]')) {
      const form = (event.target as HTMLInputElement).closest('[data-files') as HTMLFormElement

      if (!form) return

      const download = form.querySelector('*[data-label="download"]') as HTMLLabelElement
      const input = download.querySelector('*[data-input="file"]') as HTMLInputElement
      const text = download.querySelector('*[data-files-text]') as HTMLElement
      const listing = form.querySelector('*[data-files-listing]') as HTMLElement
      const item = (event.target as HTMLButtonElement).closest('[data-files-item]') as HTMLElement
      const btn = event.target as HTMLButtonElement

      for (let i = 0; i < data.length; i++) {
        if (btn.dataset.filesRemove === String(data[i].name)) {
          data.splice(i, 1)
          item.remove()
        }
      }

      switch (data.length) {
      case 0: {
        input.value = ''
        text.innerText = 'Загрузить файлы'
        listing.classList.remove('mb-5')
        break
      }

      default: {
        download.classList.remove('pointer-events-none', 'opacity-50')
        text.innerText = 'Добавить еще'
        break
      }
      }
    }
  }) as EventListener)

  return data
}

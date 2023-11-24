import { Fancybox } from '@fancyapps/ui'
import waved from './waved'

declare global {
  interface Window {
    Fancybox: typeof Fancybox
  }
}

window.Fancybox = Fancybox

export const dialogOpen = (requestUrl: string): void => {
  window.Fancybox.show(
    [
      {
        src: requestUrl,
        type: 'ajax',
      },
    ],
    {
      dragToClose: false,
      on: {
        done: (): void => waved(),
      },
    }
  )
}

export const dialogNotClosing = (requestUrl: string): void => {
  window.Fancybox.show(
    [
      {
        src: requestUrl,
        type: 'ajax',
      },
    ],
    {
      dragToClose: false,
      closeButton: false,
      backdropClick: true,
      on: {
        done: (): void => waved(),
      },
    }
  )
}

export const dialogClose = (): void => window.Fancybox.close()

export default (): void => {
  window.Fancybox.defaults.mainClass = 'fancybox-custom'
  window.Fancybox.defaults.trapFocus = false
  window.Fancybox.defaults.autoFocus = false
  window.Fancybox.defaults.placeFocusBack = false

  window.Fancybox.bind('[data-fancybox]')

  window.Fancybox.bind('[data-fancybox-dialog]', {
    dragToClose: false,
    on: {
      done: (): void => waved(),
    },
  })
}

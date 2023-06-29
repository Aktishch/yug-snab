import { Fancybox } from '@fancyapps/ui'
import airDatepicker from './air-datepicker'
import filter from './filter'
import waved from './waved'

declare global {
  interface Window {
    Fancybox: typeof Fancybox
  }
}

window.Fancybox = Fancybox

const init = (): void => {
  window.Fancybox.defaults.mainClass = 'fancybox-custom'
  window.Fancybox.defaults.trapFocus = false
  window.Fancybox.defaults.autoFocus = false
  window.Fancybox.defaults.placeFocusBack = false

  window.Fancybox.bind('[data-fancybox]')

  window.Fancybox.bind('[data-fancybox-dialog]', {
    dragToClose: false,

    on: {
      done: (): void => {
        waved.init()
      },
    },
  })

  window.Fancybox.bind('[data-fancybox-calendar]', {
    dragToClose: false,

    on: {
      done: (): void => {
        airDatepicker.init()
        filter.init()
        waved.init()
      },
    },
  })
}

const open = (requestUrl: string): void => {
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
        done: (): void => {
          waved.init()
        },
      },
    }
  )
}

const close = (): void => {
  window.Fancybox.close()
}

const preloader = (): void => {
  window.Fancybox.show(
    [
      {
        src: './dialogs/dialog-preloader.html',
        type: 'ajax',
      },
    ],

    {
      dragToClose: false,
      closeButton: false,
      backdropClick: true,
    }
  )
}

const warning = (): void => {
  window.Fancybox.show(
    [
      {
        src: './dialogs/dialog-warning.html',
        type: 'ajax',
      },
    ],

    {
      dragToClose: false,
      closeButton: false,
      backdropClick: true,

      on: {
        done: (): void => {
          waved.init()
        },
      },
    }
  )
}

export default { init, open, close, preloader, warning }

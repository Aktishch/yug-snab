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

const init = () => {
  window.Fancybox.defaults.trapFocus = false
  window.Fancybox.defaults.autoFocus = false
  window.Fancybox.defaults.placeFocusBack = false

  window.Fancybox.bind('[data-fancybox]', {
    mainClass: 'fancybox-custom',
  })

  window.Fancybox.bind('[data-fancybox-dialog]', {
    dragToClose: false,
    mainClass: 'fancybox-custom',

    on: {
      done: () => {
        waved.init()
      },
    },
  })

  window.Fancybox.bind('[data-fancybox-calendar]', {
    dragToClose: false,
    mainClass: 'fancybox-custom',

    on: {
      done: () => {
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
      mainClass: 'fancybox-custom',
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
        src: './dialogs/preloader.html',
        type: 'ajax',
      },
    ],

    {
      dragToClose: false,
      closeButton: false,
      backdropClick: true,
      mainClass: 'fancybox-custom',
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
      mainClass: 'fancybox-custom',
    }
  )
}

export default { init, open, close, preloader, warning }

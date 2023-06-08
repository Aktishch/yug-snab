declare global {
  interface Window {
    Fancybox: any
  }
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
      mainClass: 'fancybox-dialog',
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
      click: true,
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
      click: true,
    }
  )
}

export default { open, close, preloader, warning }

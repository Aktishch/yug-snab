declare global {

  interface Window {

    Fancybox: any

  }

}

const open = (requestUrl: string): void => {

  window.Fancybox.show(

    [{

      src: requestUrl,
      type: 'ajax'

    }],

    {

      dragToClose: false,
      mainClass: 'fancybox-dialog'

    }

  )

}

const loading = (): void => {

  window.Fancybox.show(

    [{

      src: '/dialogs/loading.html',
      type: 'ajax'

    }],

    {

      dragToClose: false,
      closeButton: false,
      click: true

    }

  )

}

const close = (): void => {

  window.Fancybox.close()

}

export default { open, loading, close }
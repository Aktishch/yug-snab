const plugin = require('tailwindcss/plugin')

module.exports = plugin(

  ({ addComponents, theme }) => {

    let dialog = {

      '.dialog': {
        color: theme('colors.black.DEFAULT'),
        backgroundColor: theme('colors.white.DEFAULT'),
        maxWidth: '100%'
      }

    }

    Object.entries(theme('dialogSize')).map(([key, value]) => {

      dialog = {

        ...dialog,
        [`.dialog--${key}`]: {
          width: `${value}`
        }

      }

    })

    addComponents(dialog)

  },

  {

    theme: {

      dialogSize: {

        'xs': 'var(--xs)',
        'sm': 'var(--sm)',
        'md': 'var(--md)',
        'lg': 'var(--lg)',
        'xl': 'var(--xl)'

      }

    }

  }

)
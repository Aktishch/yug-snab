const plugin = require('tailwindcss/plugin')

module.exports = plugin(

  ({ addComponents, matchComponents, theme }) => {

    addComponents({

      '.dialog': {
        color: theme('colors.black.DEFAULT'),
        backgroundColor: theme('colors.white.DEFAULT'),
        maxWidth: '100%'
      }

    })

    matchComponents(

      {

        dialog: (size) => {
          return { width: size }
        }

      },

      {
        values: theme('dialogSize')
      }

    )

  },

  {

    theme: {

      dialogSize: {

        xs: 'var(--xs)',
        sm: 'var(--sm)',
        md: 'var(--md)',
        lg: 'var(--lg)',
        xl: 'var(--xl)'

      }

    }

  }

)
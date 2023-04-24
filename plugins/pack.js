const plugin = require('tailwindcss/plugin')

module.exports = plugin(

  ({ addComponents, matchUtilities, theme }) => {

    const pack = {

      '.pack': {
        display: 'block',
        position: 'relative',
        overflow: 'hidden'
      },

      '.pack::before': {
        content: '""',
        display: 'block',
        paddingTop: 'var(--pack-size)'
      }

    }

    addComponents(pack)

    matchUtilities(

      {

        pack: (size) => {
          return { '--pack-size': `${size}%` }
        }

      },

      {
        values: theme('packSizes')
      }

    )

  },

  {

    theme: {

      packSizes: {

        'half': 50,
        'rect-sm': 60,
        'rect-md': 75,
        'rect-lg': 90,
        'box': 100,
        'sheet': 125

      }

    }

  }

)
const plugin = require('tailwindcss/plugin')

module.exports = plugin(

  ({ addComponents, theme }) => {

    let pack = {

      '.pack': {
        display: 'block',
        position: 'relative',
        overflow: 'hidden'
      },

      '.pack::before': {
        content: '""',
        display: 'block'
      }

    }

    Object.entries(theme('packSizes')).map(([key, value]) => {

      pack = {

        ...pack,
        [`.pack--${key}::before`]: {
          paddingTop: `${value}%`
        },

      }

    })

    addComponents(pack)

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
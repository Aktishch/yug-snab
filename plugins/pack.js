const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  ({ addComponents, matchComponents, theme }) => {
    addComponents({
      '.pack': {
        display: 'block',
        position: 'relative',
        overflow: 'hidden',

        '&::before': {
          content: '""',
          display: 'block',
          paddingTop: 'var(--pack-size)',
        },
      },
    })

    matchComponents(
      {
        pack: (size) => {
          return { '--pack-size': `${size}%` }
        },
      },

      {
        values: theme('packSizes'),
      }
    )
  },

  {
    theme: {
      packSizes: {
        half: 50,
        'rect-sm': 60,
        'rect-md': 75,
        'rect-lg': 90,
        box: 100,
        sheet: 125,
      },
    },
  }
)

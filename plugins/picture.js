const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  ({ addComponents, matchComponents, theme }) => {
    addComponents({
      '.image': {
        position: 'absolute',
        inset: '0',
        maxWidth: 'none',
        width: '100%',
        height: '100%',
        objectFit: 'cover',

        '&-scale-down': {
          objectFit: 'scale-down',
        },

        '&-rise': {
          transition: 'transform 0.3s linear',

          '@media (hover)': {
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },

      '.icon': {
        display: 'block',
        minWidth: '1em',
        width: '1em',
        height: '1em',
      },
    })

    matchComponents(
      {
        image: (position) => {
          return { objectPosition: position }
        },
      },

      {
        values: theme('imagePosition'),
      }
    )
  },

  {
    theme: {
      imagePosition: {
        top: 'top',
        left: 'left',
        right: 'right',
        bottom: 'bottom',
        center: 'center',
        'top-left': 'top left',
        'top-right': 'top right',
        'bottom-left': 'bottom left',
        'bottom-right': 'bottom right',
      },
    },
  }
)

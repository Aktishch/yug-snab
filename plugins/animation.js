const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  ({ addComponents, theme }) => {
    let anim = {
      '.anim': {
        transition: '0.3s ease',
      },
    }

    let clipPath = {
      '.clip-path': {
        transition: '0.3s ease',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      },
    }

    Object.entries(theme('animOccurrence')).map(([key, value]) => {
      anim = {
        ...anim,
        [`.anim-${key}:not([data-anim="show"])`]: {
          transform: `${value}`,
          visibility: 'hidden',
          opacity: 0,
        },
      }
    })

    Object.entries(theme('clipPath')).map(([key, value]) => {
      clipPath = {
        ...clipPath,
        [`.clip-path-${key}:not([data-anim="show"])`]: {
          clipPath: `${value}`,
        },
      }
    })

    addComponents(anim)
    addComponents(clipPath)
  },

  {
    theme: {
      animOccurrence: {
        fade: 'none',
        increase: 'scale(0)',
        decrease: 'scale(1.3)',
        circle: 'rotate(1turn)',
        up: 'translateY(50px)',
        down: 'translateY(-50px)',
        left: 'translateX(50px)',
        right: 'translateX(-50px)',
      },

      clipPath: {
        up: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        down: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        left: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        right: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      },
    },
  }
)

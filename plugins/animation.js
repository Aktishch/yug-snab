const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  ({ addComponents, theme }) => {
    Object.entries(theme('animOccurrence')).map(([key, value]) => {
      addComponents({
        [`.anim-${key}:not([data-anim="show"])`]: {
          transform: `${value}`,
          visibility: 'hidden',
          opacity: 0,
          transitionDuration: '0.3s',
        },
      })
    })
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
    },
  }
)

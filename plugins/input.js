const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(

  ({ addComponents, theme }) => {

    addComponents({

      '.input': {
        flexGrow: 1,
        width: '100%',
        height: 'var(--size-lg)',
        backgroundColor: theme('colors.white.DEFAULT'),
        padding: '12px 16px',
        border: `1px solid ${formatColor({ mode: 'rgba', color: parseColor(theme('colors.gray.DEFAULT')).color, alpha: 0.3 })}`,
        transition: '0.2s ease',
        userSelect: 'initial',

        '&-cover': {
          display: 'flex',
          width: '100%'
        },

        '&--textarea': {
          height: 'auto'
        },

        '&--error': {
          borderColor: theme('colors.red.DEFAULT')
        },

        '&:first-of-type': {
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px'
        },

        '&:last-of-type': {
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px'
        },

        '&:not(&--error):focus': {
          borderColor: theme('colors.gray.DEFAULT')
        },

        '&::placeholder': {
          color: theme('colors.gray.DEFAULT')
        },

        '&::disabled': {
          pointerEvents: 'none',
          opacity: 0.5
        }
      }

    })

  }

)
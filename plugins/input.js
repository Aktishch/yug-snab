const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    '.input-cover': {
      display: 'flex',
      width: '100%',

      '& .input:first-child': {
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      },

      '& .input:last-child': {
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
      },

      '& .input:nth-child(2)': {
        borderLeft: 'none',
      },
    },

    '.input': {
      flexGrow: 1,
      display: 'block',
      width: '100%',
      height: theme('size.lg'),
      backgroundColor: theme('colors.white.DEFAULT'),
      padding: '12px 16px',
      border: `1px solid ${formatColor({
        mode: 'rgba',
        color: parseColor(theme('colors.gray.DEFAULT')).color,
        alpha: 0.3,
      })}`,
      transition: '0.2s ease',
      userSelect: 'initial',

      '&:not(&--error):focus': {
        borderColor: theme('colors.gray.DEFAULT'),
      },

      '&::placeholder': {
        color: theme('colors.gray.DEFAULT'),
      },

      '&[disabled]': {
        pointerEvents: 'none',
        opacity: 0.5,
      },

      '&--error': {
        borderColor: theme('colors.red.DEFAULT'),
      },
    },
  })
})

const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  addComponents({
    '.input-cover': {
      display: 'flex',
      width: '100%',

      '& .input': {
        flexGrow: 1,
      },

      '& .input:first-child': {
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      },

      '& .input:last-child': {
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
      },
    },

    '.input': {
      '--input-text': theme('colors.black.DEFAULT'),
      display: 'block',
      width: '100%',
      height: 'var(--input-size)',
      color: 'var(--input-text)',
      backgroundColor: theme('colors.white.DEFAULT'),
      padding: 'calc(var(--input-size) / 4) calc(var(--input-size) / 3)',
      border: '1px solid var(--input-color)',
      transition: '0.2s ease',
      userSelect: 'initial',

      '&:not(&--error):focus': {
        borderColor: 'var(--input-focus)',
      },

      '&::placeholder': {
        color: theme('colors.gray.DEFAULT'),
      },

      '&[disabled]': {
        pointerEvents: 'none',
        opacity: 0.5,
      },

      '&--fade': {
        '--input-text': theme('colors.white.DEFAULT'),
        backgroundColor: 'transparent',
      },

      '&--error': {
        borderColor: theme('colors.red.DEFAULT'),
      },

      '&:-webkit-autofill': {
        borderColor: 'var(--input-color)',
        transition: 'background-color 10000s ease-in-out 0s',
        '-webkit-text-fill-color': 'var(--input-text) !important',
      },
    },
  })

  matchComponents(
    {
      input: (color) => {
        const parsed = parseColor(color.DEFAULT)

        if (!parsed.color) return null

        return {
          '--input-color': formatColor({ mode: 'rgba', color: parsed.color, alpha: 0.3 }),
          '--input-focus': color.DEFAULT,
        }
      },
    },

    {
      values: theme('colors'),
    }
  )

  matchComponents(
    {
      input: (size) => {
        return {
          '--input-size': size,
        }
      },
    },

    {
      values: theme('size'),
    }
  )
})

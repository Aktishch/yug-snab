const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  addComponents({
    '.input-cover': {
      display: 'flex',
      width: '100%',
      '--input-radius': '10px',

      '& .input': {
        flexGrow: 1,
      },

      '& .input:first-child': {
        borderTopLeftRadius: 'var(--input-radius)',
        borderBottomLeftRadius: 'var(--input-radius)',
      },

      '& .input:last-child': {
        borderTopRightRadius: 'var(--input-radius)',
        borderBottomRightRadius: 'var(--input-radius)',
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

      '&:not(&-error):focus': {
        borderColor: 'var(--input-focus)',
      },

      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },

      '&-fade': {
        '--input-text': theme('colors.white.DEFAULT'),
        backgroundColor: 'transparent',
      },

      '&-error': {
        borderColor: theme('colors.red.DEFAULT'),
      },

      '&:-webkit-autofill': {
        color: 'var(--input-text) !important',
        borderColor: 'var(--input-color)',
        background: 'none !important',
        appearance: 'none',
        transition: 'background-color 10000s ease-in-out 0s',
        '-webkit-text-fill-color': 'var(--input-text) !important',
        '-webkit-text-stroke-color': 'var(--input-text) !important',
      },
    },
  })

  matchComponents(
    {
      'input-cover': (radius) => {
        return {
          '--input-radius': radius,
        }
      },
    },

    {
      values: theme('borderRadius'),
    }
  )

  matchComponents(
    {
      input: (color) => {
        const parsed = parseColor(color.DEFAULT)

        if (!parsed.color) return null

        return {
          '--input-color': formatColor({ mode: 'rgba', color: parsed.color, alpha: 0.6 }),
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

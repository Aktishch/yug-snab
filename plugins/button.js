const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  addComponents({
    '.btn': {
      '*': {
        pointerEvents: 'none',
      },

      '--btn-color': theme('colors.black.DEFAULT'),
      '--btn-accent': theme('colors.white.DEFAULT'),
      color: 'var(--btn-color)',
      fontSize: theme('fontSize.16'),
      fontWeight: 600,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      userSelect: 'none',
      transition: '0.2s ease',
      cursor: 'pointer',

      '&:active': {
        boxShadow: `inset 0 4px 4px ${formatColor({
          mode: 'rgba',
          color: parseColor(theme('colors.black.DEFAULT')).color,
          alpha: 0.3,
        })}`,
        transform: 'translateY(4px)',
      },

      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },

      '&:focus-visible': {
        boxShadow: '0 0 0 4px var(--btn-focus)',
        backgroundColor: 'var(--btn-fade)',
      },

      '@media (hover)': {
        '&:hover': {
          backgroundColor: 'var(--btn-fade)',
        },
      },

      '&-fill': {
        color: 'var(--btn-accent)',
        backgroundColor: 'var(--btn-color)',

        '&:focus-visible': {
          backgroundColor: 'var(--btn-hovered)',
        },

        '@media (hover)': {
          '&:hover': {
            backgroundColor: 'var(--btn-hovered)',
          },
        },
      },

      '&-fade': {
        color: 'var(--btn-color)',
        backgroundColor: 'var(--btn-fade)',

        '&:focus-visible': {
          color: 'var(--btn-accent)',
          backgroundColor: 'var(--btn-color)',
        },

        '@media (hover)': {
          '&:hover': {
            color: 'var(--btn-accent)',
            backgroundColor: 'var(--btn-color)',
          },
        },
      },

      '&-light': {
        color: 'var(--btn-color)',
        backgroundColor: 'var(--btn-accent)',
        border: '1px solid transparent',

        '&:focus-visible': {
          backgroundColor: 'var(--btn-accent)',
          borderColor: 'var(--btn-color)',
        },

        '@media (hover)': {
          '&:hover': {
            backgroundColor: 'var(--btn-accent)',
            borderColor: 'var(--btn-color)',
          },
        },
      },

      '&-contur': {
        border: '1px solid var(--btn-color)',
      },
    },
  })

  matchComponents(
    {
      btn: (color) => {
        const parsed = parseColor(color.DEFAULT)

        if (!parsed.color) return null

        const [r, g, b] = parsed.color
        const hex = '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
        const amount = 25

        return {
          '--btn-color': color.DEFAULT,
          '--btn-fade': formatColor({ mode: 'rgba', color: parsed.color, alpha: 0.3 }),
          '--btn-focus': formatColor({ mode: 'rgba', color: parsed.color, alpha: 0.4 }),
          '--btn-hovered': checkColor(hex, -amount) != false ? getColor(hex, -amount) : getColor(hex, amount),
        }
      },
    },

    {
      values: theme('colors'),
    }
  )

  matchComponents(
    {
      btn: (size) => {
        return {
          borderRadius: '6px',
          height: size,
          paddingInline: `calc(${size} / 2)`,
        }
      },
    },

    {
      values: theme('size'),
    }
  )

  const checkColor = (color, amount) => {
    if (color[0] == '#') color = color.slice(1)

    const number = parseInt(color, 16)
    const r = (number >> 16) + amount
    const g = (number & 0x0000ff) + amount
    const b = ((number >> 8) & 0x00ff) + amount

    const checkColorValue = (value) => {
      if (value > 255) {
        value = 255
      } else if (value < 0) {
        value = 0
      }

      return value
    }

    const red = checkColorValue(r)
    const green = checkColorValue(g)
    const blue = checkColorValue(b)

    return ((red << 16) | green | (blue << 8)).toString(16)
  }

  const getColor = (color, amount) => {
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5, 7), 16)

    const getColorValue = (value) => {
      value = parseInt(value + amount)
      value = value < 255 ? value : 255
      value = value > 0 ? value : 0
      value = Math.round(value)

      return value.toString(16).length == 1 ? '0' + value.toString(16) : value.toString(16)
    }

    const red = getColorValue(r)
    const green = getColorValue(g)
    const blue = getColorValue(b)

    return '#' + red + green + blue
  }
})

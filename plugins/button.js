const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  addComponents({
    '.btn': {
      '& *': {
        pointerEvents: 'none',
      },

      '--btn-color': theme('colors.black.DEFAULT'),
      '--btn-accent': theme('colors.white.DEFAULT'),
      color: 'var(--btn-color)',
      fontSize: theme('fontSize.16'),
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      userSelect: 'none',
      transition: '0.2s ease',
      cursor: 'pointer',

      '&:focus-visible': {
        boxShadow: '0 0 0 4px var(--btn-focus)',
        backgroundColor: 'var(--btn-fade)',
      },

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

      '@media (hover)': {
        '&:hover': {
          backgroundColor: 'var(--btn-fade)',
        },
      },

      '&-fill': {
        color: 'var(--btn-accent)',
        backgroundColor: 'var(--btn-color)',

        '&:focus-visible': {
          backgroundColor: 'var(--btn-dark)',
        },

        '@media (hover)': {
          '&:hover': {
            backgroundColor: 'var(--btn-dark)',
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
        const hovered = checkColorShade(hex, -25) != 0 ? colorShade(hex, -25) : colorShade(hex, 25)

        return {
          '--btn-color': color.DEFAULT,
          '--btn-fade': formatColor({ mode: 'rgba', color: parsed.color, alpha: 0.3 }),
          '--btn-focus': formatColor({ mode: 'rgba', color: parsed.color, alpha: 0.4 }),
          '--btn-dark': color.dark ? color.dark : formatColor({ mode: 'rgba', color: parsed.color, alpha: 0.9 }),
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

  const checkColorShade = (col, amt) => {
    var usePound = false

    if (col[0] == '#') {
      col = col.slice(1)
      usePound = true
    }

    var num = parseInt(col, 16)

    var r = (num >> 16) + amt

    if (r > 255) r = 255
    else if (r < 0) r = 0

    var b = ((num >> 8) & 0x00ff) + amt

    if (b > 255) b = 255
    else if (b < 0) b = 0

    var g = (num & 0x0000ff) + amt

    if (g > 255) g = 255
    else if (g < 0) g = 0

    return (g | (b << 8) | (r << 16)).toString(16)
  }

  const colorShade = (color, amount) => {
    var R = parseInt(color.substring(1, 3), 16)
    var G = parseInt(color.substring(3, 5), 16)
    var B = parseInt(color.substring(5, 7), 16)

    R = parseInt(R + amount)
    G = parseInt(G + amount)
    B = parseInt(B + amount)

    R = R < 255 ? R : 255
    G = G < 255 ? G : 255
    B = B < 255 ? B : 255

    R = R > 0 ? R : 0
    G = G > 0 ? G : 0
    B = B > 0 ? B : 0

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
    var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
    var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

    return '#' + RR + GG + BB
  }
})

const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    '.switch': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      userSelect: 'none',
      color: theme('colors.primary.DEFAULT'),
      border: `1px solid ${theme('colors.gray.DEFAULT')}`,
      transition: '0.2s linear',
      appearance: 'none',
      cursor: 'pointer',

      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },

      '@media (hover)': {
        '&:hover': {
          boxShadow: `0 0 0 4px ${formatColor({
            mode: 'rgba',
            color: parseColor(theme('colors.gray.DEFAULT')).color,
            alpha: 0.4,
          })}`,
        },
      },

      '&-checkbox': {
        minWidth: '24px',
        width: '24px',
        height: '24px',
        borderRadius: '2px',

        '&::after': {
          content: '""',
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundColor: theme('colors.white.DEFAULT'),
          borderRadius: 'inherit',
          opacity: 0,
          transition: 'opacity 0.1s linear',
          mask: 'url("../img/pictures/checkbox.svg") no-repeat center / 16px',
        },

        '&:checked': {
          borderColor: 'currentColor',
          backgroundColor: 'currentColor',

          '&::after': {
            opacity: 1,
          },
        },
      },

      '&-radio': {
        minWidth: '20px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',

        '&::after': {
          content: '""',
          display: 'block',
          width: '12px',
          height: '12px',
          backgroundColor: 'currentColor',
          borderRadius: 'inherit',
          transform: 'scale(0)',
          transition: 'opacity 0.1s linear, transform 0.1s linear',
          opacity: 0,
        },

        '&:checked': {
          '&::after': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },

      '&-checkbox, &-radio': {
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '100%',
          height: '100%',
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0)',
          borderRadius: 'inherit',
          backgroundColor: 'currentColor',
        },

        '&:checked': {
          '&::before': {
            animation: 'switch-checked 0.5s linear both 1',
          },
        },
      },

      '&-toggle': {
        minWidth: '80px',
        width: '80px',
        height: '36px',
        borderRadius: '20px',

        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          marginBlock: 'auto',
          height: '24px',
          borderRadius: '20px',
        },

        '&:not(:checked)::after': {
          left: '4px',
          right: '50px',
          backgroundColor: theme('colors.gray.DEFAULT'),
          transition: 'left 0.5s ease, right 0.4s ease 0.2s',
        },

        '&:checked::after': {
          left: '50px',
          right: '4px',
          backgroundColor: 'currentColor',
          transition: 'left 0.4s ease 0.2s, right 0.5s ease, background-color 0.35s ease -0.1s',
        },
      },
    },

    '@keyframes switch-checked': {
      '0%': {
        opacity: 1,
      },

      '50%': {
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(3)',
      },
    },
  })
})

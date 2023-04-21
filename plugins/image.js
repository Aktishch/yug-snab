const plugin = require('tailwindcss/plugin')

module.exports = plugin(

  ({ addComponents, theme }) => {

    let image = {

      '.image': {
        position: 'absolute',
        inset: '0',
        maxWidth: 'none',
        width: '100%',
        height: '100%'
      },

      '.image:not(.image--scale-down)': {
        objectFit: 'cover'
      },

      '.image--scale-down': {
        objectFit: 'scale-down'
      },

      '.image--rise': {
        transition: 'transform 0.3s linear'
      },

      '@media(hover)': {
        '.image--rise:hover': {
          transform: 'scale(1.1)'
        }
      }

    }

    Object.entries(theme('imagePosition')).map(([key, value]) => {

      image = {

        ...image,
        [`.image--${key}`]: {
          objectPosition: `${value}`
        },

      }

    })

    addComponents(image)

  },

  {

    theme: {

      imagePosition: {

        'top': 'top',
        'left': 'left',
        'right': 'right',
        'bottom': 'bottom',
        'top-left': 'top left',
        'top-right': 'top right',
        'bottom-left': 'bottom left',
        'bottom-right': 'bottom right'

      }

    }

  }

)
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeRu from 'air-datepicker/locale/ru'
import touchDevice from '../ts/functions/touch-device'

const init = () => {

  const datepickers = document.querySelectorAll('*[data-datepicker]')

  const excludeDates = [

    +new Date(2023, 3, 5),
    +new Date(2023, 3, 7),
    +new Date(2023, 3, 10)

  ]

  window.excludeDates = excludeDates

  const renderCellHandler = ({ date, cellType }) => {

    if (cellType === 'day') {

      return {

        classes: window.excludeDates.includes(+date) ? 'btn btn-primary btn-fill text-14' : 'pointer-events-none',

        attrs: {

          'data-filter-category': `category-${date.getDate()}-${+date.getMonth()}`

        }

      }

    }

  }

  const calendar = new AirDatepicker('#calendar', {

    locale: localeRu,
    onRenderCell: renderCellHandler,
    selectedDates: [new Date()]

  })

  datepickers.forEach(datepicker => {

    if (!datepicker) return

    const inputMin = datepicker.querySelector('*[data-input="min"]')
    const inputMax = datepicker.querySelector('*[data-input="max"]')

    let min = new AirDatepicker(inputMin, {

      onSelect({ date }) {

        max.update({

          minDate: date

        })

      },

      locale: localeRu,
      isMobile: touchDevice.init(),
      autoClose: true,
      minDate: new Date(),
      position: inputMin.dataset.position || 'bottom left'

    })

    let max = new AirDatepicker(inputMax, {

      onSelect({ date }) {

        min.update({

          maxDate: date

        })

      },

      locale: localeRu,
      isMobile: touchDevice.init(),
      autoClose: true,
      minDate: new Date(),
      position: inputMax.dataset.position || 'bottom left'

    })

  })

}

export default { init }
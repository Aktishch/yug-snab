import AirDatepicker from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'
import touchDevice from '../ts/functions/touch-device'

declare global {
  interface Window {
    excludeDates: number[]
  }
}

const init = () => {
  const datepickers = document.querySelectorAll('*[data-datepicker]') as NodeListOf<Element>
  const excludeDates: number[] = [+new Date(2023, 5, 5), +new Date(2023, 5, 7), +new Date(2023, 5, 10)]

  window.excludeDates = excludeDates

  const renderCellHandler = ({ date, cellType }) => {
    if (cellType === 'day') {
      return {
        classes: window.excludeDates.includes(+date) ? 'btn btn-primary btn-fill text-14' : 'pointer-events-none',

        attrs: {
          'data-filter-category': `category-${date.getDate()}-${+date.getMonth()}`,
        },
      }
    }
  }

  new AirDatepicker('#calendar', {
    locale: localeRu,
    onRenderCell: renderCellHandler,
    selectedDates: [new Date()],
  })

  datepickers.forEach((datepicker) => {
    if (!datepicker) return

    const inputMin = datepicker.querySelector('*[data-input="min"]')
    const inputMax = datepicker.querySelector('*[data-input="max"]')

    const min = new AirDatepicker(inputMin, {
      onSelect({ date }) {
        max.update({
          minDate: date,
        })
      },

      locale: localeRu,
      isMobile: touchDevice.init(),
      autoClose: true,
      minDate: new Date(),
      position: inputMin.dataset.position || 'bottom left',
    })

    const max = new AirDatepicker(inputMax, {
      onSelect({ date }) {
        min.update({
          maxDate: date,
        })
      },

      locale: localeRu,
      isMobile: touchDevice.init(),
      autoClose: true,
      minDate: new Date(),
      position: inputMax.dataset.position || 'bottom left',
    })
  })
}

export default { init }

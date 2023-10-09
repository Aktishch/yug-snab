import AirDatepicker from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'
import { touchDevice } from './functions/touch-device'
import filter from './filter'

declare global {
  interface Window {
    AirDatepicker: typeof AirDatepicker
    excludeDates: number[]
  }
}

window.AirDatepicker = AirDatepicker

export default (): void => {
  const datepickers = document.querySelectorAll('*[data-datepicker]') as NodeListOf<Element>
  const excludeDates: number[] = [+new Date(2023, 9, 5), +new Date(2023, 9, 7), +new Date(2023, 10, 10)]

  window.excludeDates = excludeDates

  const renderCellHandler = ({ date, cellType }) => {
    if (cellType === 'day') {
      return {
        classes: window.excludeDates.includes(+date)
          ? 'filter-active btn btn-primary btn-fill text-14'
          : 'pointer-events-none',
        attrs: {
          'data-filter-category': `date-${date.getDate()}-${date.getMonth() + 1}`,
        },
      }
    }
  }

  new window.AirDatepicker('#calendar', {
    locale: localeRu,
    onRenderCell: renderCellHandler,
    selectedDates: [new Date()],
  })

  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLElement).closest('#calendar')) {
      const calendar = (event.target as HTMLElement).closest('#calendar') as HTMLElement

      if (calendar.querySelector('.filter-active')) filter()
    }
  }) as EventListener)

  datepickers.forEach((element: Element): void => {
    const datepicker = element as HTMLElement

    if (!datepicker) return

    const inputMin = datepicker.querySelector('*[data-input="min"]') as HTMLInputElement
    const inputMax = datepicker.querySelector('*[data-input="max"]') as HTMLInputElement

    const min = new window.AirDatepicker(inputMin, {
      onSelect({ date }) {
        max.update({
          minDate: String(date),
        })
      },
      locale: localeRu,
      isMobile: touchDevice(),
      autoClose: true,
      minDate: new Date(),
      position: 'bottom left' || inputMin.dataset.position,
    }) as AirDatepicker<HTMLInputElement>

    const max = new window.AirDatepicker(inputMax, {
      onSelect({ date }) {
        min.update({
          maxDate: String(date),
        })
      },
      locale: localeRu,
      isMobile: touchDevice(),
      autoClose: true,
      minDate: new Date(),
      position: 'bottom left' || inputMax.dataset.position,
    }) as AirDatepicker<HTMLInputElement>
  })
}

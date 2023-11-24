import ymaps from 'ymaps'

declare global {
  interface maps {
    Map(element: HTMLElement, options: object): void
    Placemark(mark: number[], empty: object, options: object): void
    SuggestView(element: Element, options: object): void
  }
}

export default (): void => {
  const yandexMap = document.querySelector('#yandex-map') as HTMLElement

  if (!yandexMap) return

  ymaps
    .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
    .then((maps: maps): void => {
      const center: number[] = [43.43604457453854, 39.93302499999994]
      const mark: number[] = [43.43604457453854, 39.93302499999994]
      const inputs: Element[] = [...document.querySelectorAll('[data-suggest-view]')]

      const map = new maps.Map(yandexMap, {
        center: center,
        zoom: 16,
      })

      const placemark = new maps.Placemark(
        mark,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: './img/pictures/geo.png',
          iconImageSize: [90, 90],
          iconImageOffset: [-45, -45],
        }
      )

      inputs.forEach((input: Element): void => {
        new maps.SuggestView(input, {
          results: 5,
          container: document.body,
        })
      })

      map.controls.remove('geolocationControl')
      map.controls.remove('searchControl')
      map.controls.remove('trafficControl')
      map.controls.remove('typeSelector')
      map.controls.remove('fullscreenControl')
      map.controls.remove('rulerControl')
      map.behaviors.disable(['scrollZoom'])
      map.geoObjects.add(placemark)
    })
    .catch((error: string) => console.log('Failed to load Yandex Maps', error))
}

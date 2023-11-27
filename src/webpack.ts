import fancybox from './ts/fancybox'
import sliderSwiper from './ts/slider-swiper'
import yandexMap from './ts/yandex-map'
import scrollHeader from './ts/scroll-header'
import currentTab from './ts/current-tab'
import currentYear from './ts/current-year'
import animation from './ts/animation'
import waved from './ts/waved'
import submitHandler from './ts/submit-handler'
import inputs from './ts/inputs'
import phoneMask from './ts/phone-mask'
import preloader from './ts/preloader'

import './scss/style.scss'

window.addEventListener('DOMContentLoaded', ((): void => {
  fancybox()
  sliderSwiper()
  yandexMap()
  currentTab()
  currentYear()
  scrollHeader()
  animation()
  waved()
  submitHandler()
  inputs()
  phoneMask()
  preloader()
}) as EventListener)

// Scripts
import fancybox from './ts/fancybox'
import sliderSwiper from './ts/slider-swiper'
import yandexMap from './ts/yandex-map'
import airDatepicker from './ts/air-datepicker'
import smoothScroll from './ts/smooth-scroll'
import scrollHeader from './ts/scroll-header'
import currentTab from './ts/current-tab'
import sidebar from './ts/sidebar'
import progressLine from './ts/progress-line'
import scrollTo from './ts/scroll-to'
import smartMenu from './ts/smart-menu'
import social from './ts/social'
import draggable from './ts/draggable'
import theme from './ts/theme'
import snowflakes from './ts/snowflakes'
import animation from './ts/animation'
import waved from './ts/waved'
import movement from './ts/movement'
import bubbles from './ts/bubbles'
import inverted from './ts/inverted'
import listing from './ts/listing'
import accordion from './ts/accordion'
import formatBg from './ts/format-bg'
import parallax from './ts/parallax'
import filter from './ts/filter'
import outNumber from './ts/out-number'
import writeText from './ts/write-text'
import downloadFiles from './ts/download-files'
import formSubmit from './ts/form-submit'
import formSave from './ts/form-save'
import dragAndDrop from './ts/drag-and-drop'
import choiceFile from './ts/choice-file'
import copyLink from './ts/copy-link'
import inputs from './ts/inputs'
import phoneMask from './ts/phone-mask'
import password from './ts/password'
import quantity from './ts/quantity'
import range from './ts/range'
import player from './ts/player'
import basket from './ts/basket'
import warning from './ts/warning'
import horizontalScrolling from './ts/horizontal-scrolling'
import quiz from './ts/quiz'
import compare from './ts/compare'
import timeCounter from './ts/time-counter'
import timer from './ts/timer'
import worldMap from './ts/world-map'
import preloader from './ts/preloader'

// Style
import './scss/style.scss'

// Connection
window.addEventListener('DOMContentLoaded', ((): void => {
  fancybox.init()
  sliderSwiper.init()
  yandexMap.init()
  airDatepicker.init()
  currentTab.init()
  smoothScroll.init()
  scrollHeader.init()
  sidebar.init()
  progressLine.init()
  scrollTo.init()
  smartMenu.init()
  social.init()
  draggable.init()
  theme.init()
  snowflakes.init()
  animation.init()
  waved.init()
  movement.init()
  bubbles.init()
  inverted.init()
  listing.init()
  accordion.init()
  formatBg.init()
  parallax.init()
  filter.init()
  outNumber.init()
  writeText.init()
  formSubmit.init(downloadFiles.init())
  formSave.init()
  dragAndDrop.init()
  choiceFile.init()
  copyLink.init()
  inputs.init()
  phoneMask.init()
  password.init()
  quantity.init()
  range.init()
  player.init()
  basket.init()
  warning.init()
  horizontalScrolling.init()
  quiz.init()
  compare.init()
  timeCounter.init()
  timer.init()
  worldMap.init()
  preloader.init()
}) as EventListener)

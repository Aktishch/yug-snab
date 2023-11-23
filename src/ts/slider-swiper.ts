import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs } from 'swiper'
import { media } from './functions/media'

declare global {
  interface Window {
    Swiper: typeof Swiper
  }
}

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs])
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper

export default (): void => {
  new window.Swiper('.services-slider .swiper', {
    slidesPerView: 1.2,
    slidesPerGroup: 1,
    spaceBetween: 24,
    grabCursor: true,
    watchSlidesProgress: true,
    breakpoints: {
      [media.sm]: {
        slidesPerView: 1.8,
      },
      [media.md]: {
        slidesPerView: 2.3,
      },
      [media.lg]: {
        slidesPerView: 3,
      },
      [media.xl]: {
        slidesPerView: 4,
        allowTouchMove: false,
      },
    },
  }) as Swiper
}

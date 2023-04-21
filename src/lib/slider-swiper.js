import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import media from '../ts/functions/media'
import quiz from '../ts/quiz'

const init = () => {

  const gallerySlider = new Swiper('.gallery-slider .swiper', {

    pagination: {

      el: '.gallery-slider .swiper-pagination',
      clickable: true

    },

    navigation: {

      prevEl: '.gallery-slider .swiper-button-prev',
      nextEl: '.gallery-slider .swiper-button-next'

    },

    effect: 'coverflow',
    slidesPerView: 1.3,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    freeMode: true,

    breakpoints: {

      [media.sm]: {

        slidesPerView: 2

      },

      [media.lg]: {

        slidesPerView: 3

      }

    },

    autoplay: {

      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false

    }

  })

  const productsSlider = new Swiper('.products-slider .swiper', {

    pagination: {

      el: '.products-slider .swiper-pagination',
      clickable: true

    },

    navigation: {

      prevEl: '.products-slider .swiper-button-prev',
      nextEl: '.products-slider .swiper-button-next'

    },

    slidesPerView: 1.3,
    slidesPerGroup: 1,
    spaceBetween: 20,
    grabCursor: true,
    watchSlidesProgress: true,

    breakpoints: {

      [media.sm]: {

        slidesPerView: 2

      },

      [media.lg]: {

        slidesPerView: 3

      },

      [media.xl]: {

        slidesPerView: 4

      }

    }

  })

  const quizImages = new Swiper('.quiz-images .swiper', {

    effect: 'cube',
    slidesPerView: 1,
    slidesPerGroup: 1,
    allowTouchMove: false

  })

  const quizSlider = new Swiper('.quiz-slider .swiper', {

    navigation: {

      prevEl: '.quiz-slider .swiper-button-prev',
      nextEl: '.quiz-slider .swiper-button-next'

    },

    pagination: {

      el: '.quiz-slider .swiper-pagination',
      type: 'custom',

      renderCustom: (swiper, current, total) => {

        return total - current

      }

    },

    effect: 'flip',
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    allowTouchMove: false,
    watchSlidesProgress: true,

    on: {

      slideChange: (swiper) => {

        quizImages.slideTo(swiper.activeIndex)

        quiz.checkQuizSlide(swiper.visibleSlides[0])

        if (swiper.visibleSlides[0] == swiper.slides[swiper.slides.length - 1]) {

          swiper.el.closest('[data-quiz]').setAttribute('data-quiz-end', '')

        } else {

          swiper.el.closest('[data-quiz]').removeAttribute('data-quiz-end')

        }

      }

    }

  })

  const descriptionBg = new Swiper('.description-bg .swiper', {

    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 1000,
    allowTouchMove: false

  })

  const descriptionBullets = new Swiper('.description-bullets .swiper', {

    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 1000,
    grabCursor: true,

    breakpoints: {

      [media.md]: {

        slidesPerView: 4

      }

    }

  })

  const descriptionInfo = new Swiper('.description-info .swiper', {

    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 1000,
    allowTouchMove: false

  })

  const descriptionSlider = new Swiper('.description-slider .swiper', {

    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 1000,
    grabCursor: true,

    thumbs: {

      swiper: descriptionBullets

    },

    on: {

      slideChange: (swiper) => {

        descriptionBg.slideTo(swiper.activeIndex)
        descriptionInfo.slideTo(swiper.activeIndex)

      }

    }

  })

  window.Swiper = Swiper

}

export default { init }
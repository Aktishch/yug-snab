import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import ScrollSmoother from './scroll-smoother'

const createAnimations = () => {

  {

    const header = document.querySelector('*[data-header]')
    const smoothContent = document.querySelector('#smooth-content')

    smoothContent.style.paddingTop = `${header.offsetHeight}px`

    const scrollHeader = gsap.from(header, {

      yPercent: -100,
      duration: 0.3,
      ease: 'sine.out'

    })

    ScrollTrigger.create({

      start: 'top top',
      onUpdate: (self) => {

        smoothContent.style.paddingTop = `${header.offsetHeight}px`

        if (self.direction === -1) {

          scrollHeader.play()

        } else {

          scrollHeader.reverse()

        }

      }

    })

  }

  {

    const items = document.querySelectorAll('*[data-gsap]')

    items.forEach(item => {

      if (!item) return

      if (item.dataset.gsap == 'up') {

        gsap.from(item, {

          y: 100,
          opacity: 0
          
        })

      }

      if (item.dataset.gsap == 'down') {

        gsap.from(item, {

          y: -100,
          opacity: 0
          
        })

      }

      if (item.dataset.gsap == 'left') {

        gsap.from(item, {

          x: 100,
          opacity: 0
          
        })

      }

      if (item.dataset.gsap == 'right') {

        gsap.from(item, {

          x: -100,
          opacity: 0
          
        })

      }

    })

  }

}

const init = () => {

  gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother)

  ScrollTrigger.defaults({ toggleActions: 'play none none reverse' })
  ScrollTrigger.refresh(true)

  if (ScrollTrigger.isTouch !== 1) {

    ScrollSmoother.create({

      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 3,
      effects: true

    })

    if (document.readyState == 'complete') {

      ScrollSmoother.get().paused(false)

    } else {

      ScrollSmoother.get().paused(true)

    }

  }

  createAnimations()

}

export default { init }
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import ScrollSmoother from './scroll-smoother'

const scrollHeader = () => {

  const header = document.querySelector('*[data-header]')
  const smoothContent = document.querySelector('#smooth-content')

  smoothContent.style.paddingTop = `${header.offsetHeight}px`

  const positionHeader = gsap.from(header, {

    yPercent: -100,
    duration: 0.3,
    ease: 'sine.out'

  })

  ScrollTrigger.create({

    start: 'top top',
    onUpdate: (self) => {

      smoothContent.style.paddingTop = `${header.offsetHeight}px`

      self.direction === -1 ? positionHeader.play() : positionHeader.reverse()

    }

  })

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

  scrollHeader()

}

export default { init }
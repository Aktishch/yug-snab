import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import ScrollSmoother from './scroll-smoother'

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

}

export default { init }
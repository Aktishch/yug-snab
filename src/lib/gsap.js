import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import ScrollSmoother from './scroll-smoother'

const init = () => {

  const smoothWrapper = document.querySelector('#smooth-wrapper')
  const smoothContent = document.querySelector('#smooth-content')

  gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother)

  ScrollTrigger.defaults({ toggleActions: 'play none none reverse' })
  ScrollTrigger.refresh(true)

  if (ScrollTrigger.isTouch !== 1) {

    ScrollSmoother.create({

      wrapper: smoothWrapper,
      content: smoothContent,
      smooth: 3,
      effects: true

    })

    if (document.readyState == 'complete') {

      ScrollSmoother.get().paused(false)

    } else {

      ScrollSmoother.get().paused(true)

    }

  }

  // const header = document.querySelector('*[data-header]')
  // smoothContent.style.paddingTop = `${header.offsetHeight}px`

  // const scrollHeader = gsap.from(header, {

  //   yPercent: -100,
  //   duration: 0.3,
  //   ease: 'sine.out'

  // })

  // ScrollTrigger.create({

  //   start: 'top top',
  //   onUpdate: (self) => {

  //     if (self.direction === -1) {

  //       scrollHeader.play()

  //     } else {

  //       scrollHeader.reverse()

  //     }

  //   }

  // })

}

export default { init }
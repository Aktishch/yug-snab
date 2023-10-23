const setAccordion = (element: HTMLElement): void => {
  const accordion = element as HTMLElement
  const toggle = accordion.querySelector('*[data-accordion-toggle]') as HTMLElement
  const content = accordion.querySelector('*[data-accordion-content]') as HTMLElement
  let timeOut: NodeJS.Timeout

  const setAccordionHeight = (): void => {
    if (timeOut) clearTimeout(timeOut)

    content.style.height = `${content.scrollHeight}px`

    switch (accordion.dataset.accordion) {
    case 'hidden': {
      timeOut = setTimeout((): void => {
        content.style.height = '0'
      }, 10)
      break
    }

    case 'active': {
      timeOut = setTimeout((): void => {
        content.style.height = ''
      }, 300)
      break
    }
    }
  }

  toggle.classList.add('cursor-pointer')
  content.classList.add('overflow-hidden', 'duration-3')
  setAccordionHeight()

  toggle.addEventListener('click', ((): void => {
    switch (accordion.dataset.accordion) {
    case 'hidden': {
      accordion.dataset.accordion = 'active'
      setAccordionHeight()
      break
    }

    case 'active': {
      accordion.dataset.accordion = 'hidden'
      setAccordionHeight()
      break
    }
    }
  }) as EventListener)

  switch (accordion.dataset.accordionClose) {
  case 'click': {
    document.addEventListener('click', ((event: Event): void => {
      if (
        (event.target as HTMLElement).closest('[data-accordion-close="click"]') !== accordion &&
          accordion.dataset.accordion === 'active'
      ) {
        accordion.dataset.accordion = 'hidden'
        setAccordionHeight()
      }
    }) as EventListener)

    break
  }

  case 'scroll': {
    document.addEventListener('scroll', ((): void => {
      if (accordion.dataset.accordion === 'active') {
        accordion.dataset.accordion = 'hidden'
        setAccordionHeight()
      }
    }) as EventListener)

    break
  }
  }
}

export default (): void => {
  const accordions = document.querySelectorAll('*[data-accordion]') as NodeListOf<Element>

  accordions.forEach((element: Element): void => {
    const accordion = element as HTMLElement

    if (accordion) setAccordion(accordion)
  })
}

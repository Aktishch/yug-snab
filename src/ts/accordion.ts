const setAccordion = (element: HTMLElement): void => {
  const accordion = element as HTMLElement
  const toggle = accordion.querySelector('*[data-accordion-toggle]') as HTMLElement
  const content = accordion.querySelector('*[data-accordion-content]') as HTMLElement
  const accordionItems = accordion.querySelectorAll('*[data-accordion]') as NodeListOf<Element>

  const setAccordionHeight = (): void => {
    switch (accordion.dataset.accordion) {
    case 'hidden': {
      content.style.height = '0'
      break
    }

    case 'active': {
      content.style.height = `${content.scrollHeight}px`
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

  accordionItems.forEach((element: Element): void => {
    const accordionItem = element as HTMLElement

    if (!accordionItem) return

    const accordionItemToggle = accordionItem.querySelector('*[data-accordion-toggle]') as HTMLElement
    const accordionItemContent = accordionItem.querySelector('*[data-accordion-content]') as HTMLElement

    accordionItemToggle.addEventListener('click', ((): void => {
      switch (accordionItem.dataset.accordion) {
      case 'hidden': {
        content.style.height = `${content.scrollHeight + accordionItemContent.scrollHeight}px`
        break
      }

      case 'active': {
        content.style.height = `${content.scrollHeight - accordionItemContent.scrollHeight}px`
        break
      }
      }
    }) as EventListener)
  })
}

const accordionClose = (value: string): void => {
  const accordions = document.querySelectorAll(`*[data-accordion-close="${value}"]`) as NodeListOf<Element>

  accordions.forEach((element: Element): void => {
    const accordion = element as HTMLElement

    if (!accordion) return

    const content = accordion.querySelector('*[data-accordion-content]') as HTMLElement

    if (accordion.dataset.accordion === 'active') {
      accordion.dataset.accordion = 'hidden'
      content.style.height = '0'
    }
  })
}

export default (): void => {
  const accordions = document.querySelectorAll('*[data-accordion]') as NodeListOf<Element>

  accordions.forEach((element: Element): void => {
    const accordion = element as HTMLElement

    if (accordion) setAccordion(accordion)
  })

  document.addEventListener('click', ((event: Event): void => {
    if (!(event.target as HTMLElement).closest('[data-accordion-close="click"]')) accordionClose('click')
  }) as EventListener)

  document.addEventListener('scroll', ((): void => {
    accordionClose('scroll')
  }) as EventListener)
}

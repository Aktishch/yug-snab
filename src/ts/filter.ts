const filtering = (name: string, cards: NodeListOf<Element>): void => {
  cards.forEach((element: Element): void => {
    const card = element as HTMLElement
    const absence: boolean = card.dataset.filterCard != name
    const showAll: boolean = name.toLowerCase() === 'all'

    if (absence && !showAll) {
      card.classList.add('hidden')
    } else {
      card.classList.remove('hidden')
      card.classList.add('filter-show')

      setTimeout((): void => card.classList.remove('filter-show'), 300)
    }
  })
}

const init = (): void => {
  const filters = document.querySelectorAll('*[data-filter]') as NodeListOf<Element>

  filters.forEach((element: Element): void => {
    const filter = element as HTMLElement

    if (!filter) return

    const hash: string = window.location.hash.substr(1)
    const categories = filter.querySelectorAll('*[data-filter-category]') as NodeListOf<Element>
    const categoryActive = filter.getElementsByClassName('filter-active') as HTMLCollectionOf<Element>
    const line = filter.querySelector('*[data-filter-line]') as HTMLElement
    const cards = filter.querySelectorAll('*[data-filter-card]') as NodeListOf<Element>

    if (line) {
      line.style.width = `${(categoryActive[0] as HTMLElement).offsetWidth}px`
      line.style.left = `${(categoryActive[0] as HTMLElement).offsetLeft}px`
    }

    const currentCard = (category: HTMLElement): void => {
      const active = categoryActive[0] as HTMLElement
      const name = String(category.dataset.filterCategory)

      if (active) {
        active.className = active.className.replace('filter-active', '')
        category.classList.add('filter-active')
      }

      if (line) {
        line.style.width = `${category.offsetWidth}px`
        line.style.left = `${category.offsetLeft}px`
      }

      filtering(name, cards)
    }

    categories.forEach((element: Element): void => {
      const category = element as HTMLElement

      category.addEventListener('click', ((): void => {
        currentCard(category)
      }) as EventListener)
    })

    if (hash && hash != '') {
      for (const [index, card] of cards.entries()) {
        if (card.querySelector(`#${hash}`)) {
          const category = categories[index] as HTMLElement

          currentCard(category)
        }
      }
    }
  })
}

export default { init }

const filtering = (name: string, cards: NodeListOf<Element>): void => {
  cards.forEach((element: Element): void => {
    const card = element as HTMLElement
    const absence: boolean = String(card.dataset.filterCard).split(' ').includes(name) === false
    const showAll: boolean = name.toLowerCase() === 'all'

    switch (absence && !showAll) {
    case true: {
      card.classList.add('hidden')
      break
    }

    case false: {
      card.classList.remove('hidden')
      card.classList.add('filter-show')
      setTimeout((): void => card.classList.remove('filter-show'), 300)
      break
    }
    }
  })
}

export default (): void => {
  const filters = document.querySelectorAll('*[data-filter]') as NodeListOf<Element>

  filters.forEach((element: Element): void => {
    const filter = element as HTMLElement

    if (!filter) return

    const hash: string = window.location.hash.substr(1)
    const categories = filter.querySelectorAll('*[data-filter-category]') as NodeListOf<Element>
    const categoryActive = filter.getElementsByClassName('filter-active') as HTMLCollectionOf<Element>
    const line = filter.querySelector('*[data-filter-line]') as HTMLElement
    const cards = filter.querySelectorAll('*[data-filter-card]') as NodeListOf<Element>

    const currentCard = (category: HTMLElement): void => {
      const active = categoryActive[0] as HTMLElement
      const name = String(category.dataset.filterCategory)

      active.className = active.className.replace('filter-active', '')
      category.classList.add('filter-active')

      if (line) {
        line.style.width = `${category.offsetWidth}px`
        line.style.left = `${category.offsetLeft}px`
      }

      filtering(name, cards)
    }

    currentCard(categoryActive[0] as HTMLElement)

    categories.forEach((element: Element): void => {
      const category = element as HTMLElement

      if (!category) return

      category.addEventListener('click', ((): void => {
        currentCard(category)
      }) as EventListener)
    })

    if (hash && hash !== '') {
      for (const [index, card] of cards.entries()) {
        if (card.querySelector(`#${hash}`)) {
          const category = categories[index] as HTMLElement

          currentCard(category)
        }
      }
    }
  })
}

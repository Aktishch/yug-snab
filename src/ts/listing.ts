const init = (): void => {
  const listings = document.querySelectorAll('*[data-listing]') as NodeListOf<Element>

  listings.forEach((element: Element): void => {
    const listing = element as HTMLElement

    if (!listing) return

    const show = listing.querySelector('*[data-listing-show]') as HTMLButtonElement

    show.addEventListener('click', ((): void => {
      const items = listing.querySelectorAll('*[data-listing-item]') as NodeListOf<Element>
      const count: number =
        listing.dataset.listing !== '' || undefined || null ? Number(listing.dataset.listing) : items.length

      for (let i = 0; i < count; i++) {
        if (items[i] && items[i].classList.contains('hidden')) items[i].classList.remove('hidden')

        if (items[i] && items[i].hasAttribute('data-anim')) (items[i] as HTMLElement).dataset.anim = 'show'

        if (items[i]) items[i].removeAttribute('data-listing-item')

        if (!items[i] || items.length === count) show.remove()
      }
    }) as EventListener)
  })
}

export default { init }

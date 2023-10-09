import { scrollbarShow, scrollbarHidden } from './functions/scrollbar'
import { media } from '../ts/functions/media'

const openSidebar = (sidebar: HTMLElement): void => {
  scrollbarHidden()
  sidebar.dataset.sidebar = 'open'
}

const closeSidebar = (sidebar: HTMLElement): void => {
  scrollbarShow()
  sidebar.dataset.sidebar = 'close'
}

export default (): void => {
  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLButtonElement).closest('[data-sidebar-open]')) {
      const open = event.target as HTMLButtonElement
      const sidebar = document.querySelector(`#${open.dataset.sidebarOpen}`) as HTMLElement

      if (sidebar) openSidebar(sidebar)
    }

    if ((event.target as HTMLButtonElement).closest('[data-sidebar-close]')) {
      const close = event.target as HTMLButtonElement
      const sidebar = document.querySelector(`#${close.dataset.sidebarClose}`) as HTMLElement

      if (sidebar) closeSidebar(sidebar)
    }

    if ((event.target as HTMLElement).hasAttribute('data-sidebar')) {
      const sidebar = event.target as HTMLElement

      if (sidebar) closeSidebar(sidebar)
    }

    if ((event.target as HTMLAnchorElement).hasAttribute('data-scroll')) {
      const link = event.target as HTMLAnchorElement
      const sidebar = link.closest('[data-sidebar]') as HTMLElement

      if (sidebar) closeSidebar(sidebar)
    }
  }) as EventListener)

  window.addEventListener('resize', ((): void => {
    const html = document.documentElement as HTMLElement
    const sidebars = document.querySelectorAll('*[data-sidebar]') as NodeListOf<Element>

    sidebars.forEach((element: Element): void => {
      const sidebar = element as HTMLElement

      if (sidebar.dataset.sidebarResize) {
        const breakpoint: number = media[sidebar.dataset.sidebarResize]

        if (html.clientWidth > breakpoint) closeSidebar(sidebar)
      }
    })
  }) as EventListener)
}

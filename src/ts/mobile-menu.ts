import scrollbar from './functions/scrollbar'
import media from '../ts/functions/media'

// const createSidebar = (id: string): void => {
//   const sidebar = document.querySelector(`*[data-sidebar="${id}"]`) as HTMLElement

//   if (!sidebar) return

//   const open = document.querySelector(`*[data-sidebar-open="${id}"]`) as HTMLButtonElement
//   const close = sidebar.querySelector(`*[data-sidebar-close="${id}"]`) as HTMLButtonElement

//   const openSidebar = (): void => {
//     scrollbar.hidden()

//     sidebar.dataset.sidebaСcondition = 'open'
//   }

//   const closeSidebar = (): void => {
//     scrollbar.show()

//     sidebar.dataset.sidebaСcondition = 'close'
//   }

//   open.addEventListener('click', openSidebar as EventListener)
//   close.addEventListener('click', closeSidebar as EventListener)
// }

const init = (): void => {
  const menu = document.querySelector('*[data-mobile]') as HTMLElement

  if (!menu) return

  const burger = document.querySelector('*[data-burger]') as HTMLButtonElement
  const close = menu.querySelector('*[data-mobile-close]') as HTMLButtonElement

  const openMobileMenu = (): void => {
    scrollbar.hidden()

    menu.dataset.mobile = 'open'
  }

  const closeMobileMenu = (): void => {
    scrollbar.show()

    menu.dataset.mobile = 'close'
  }

  burger.addEventListener('click', openMobileMenu as EventListener)
  close.addEventListener('click', closeMobileMenu as EventListener)

  menu.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLAnchorElement).hasAttribute('data-scroll')) closeMobileMenu()
  }) as EventListener)

  document.addEventListener('click', ((event: Event): void => {
    if ((event.target as HTMLElement).hasAttribute('data-mobile')) closeMobileMenu()
  }) as EventListener)

  window.addEventListener('resize', ((): void => {
    if (window.screen.width > media.lg) closeMobileMenu()
  }) as EventListener)
}

export default { init }

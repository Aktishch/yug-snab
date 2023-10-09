import { touchDevice } from './touch-device'

export const scrollbarShow = (): void => {
  const html = document.documentElement as HTMLElement
  const smoothScroll = document.querySelector('#smooth-scroll') as HTMLElement

  if (!touchDevice()) {
    smoothScroll ? (smoothScroll.style.right = '0') : (html.style.marginRight = '0')
  }

  html.classList.remove('overflow-hidden')
}

export const scrollbarHidden = (): void => {
  const html = document.documentElement as HTMLElement
  const smoothScroll = document.querySelector('#smooth-scroll') as HTMLElement
  const scrollbarWidth: number = window.innerWidth - html.clientWidth

  if (!touchDevice()) {
    smoothScroll ? (smoothScroll.style.right = `${scrollbarWidth}px`) : (html.style.marginRight = `${scrollbarWidth}px`)
  }

  html.classList.add('overflow-hidden')
}

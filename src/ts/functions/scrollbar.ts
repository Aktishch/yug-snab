const show = (): void => {
  const html = document.documentElement as HTMLElement
  const smoothWrapper = document.querySelector('#smooth-wrapper') as HTMLElement

  smoothWrapper ? (smoothWrapper.style.right = '0') : (html.style.marginRight = '0')

  html.classList.remove('overflow-hidden')
}

const hidden = (): void => {
  const html = document.documentElement as HTMLElement
  const smoothWrapper = document.querySelector('#smooth-wrapper') as HTMLElement
  const scrollbarWidth: number = window.innerWidth - html.clientWidth

  smoothWrapper ? (smoothWrapper.style.right = `${scrollbarWidth}px`) : (html.style.marginRight = `${scrollbarWidth}px`)

  html.classList.add('overflow-hidden')
}

export default { show, hidden }

const show = (): void => {
  const html = document.documentElement as HTMLElement
  const smoothWrapper = document.querySelector('#smooth-wrapper') as HTMLElement

  if (smoothWrapper) {
    smoothWrapper.style.right = '0'
  } else {
    html.style.marginRight = '0'
  }

  html.classList.remove('overflow-hidden')
}

const hidden = (): void => {
  const html = document.documentElement as HTMLElement
  const smoothWrapper = document.querySelector('#smooth-wrapper') as HTMLElement
  const scrollbarWidth: number = window.innerWidth - html.clientWidth

  if (smoothWrapper) {
    smoothWrapper.style.right = `${scrollbarWidth}px`
  } else {
    html.style.marginRight = `${scrollbarWidth}px`
  }

  html.classList.add('overflow-hidden')
}

export default { show, hidden }

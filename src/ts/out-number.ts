const setOutNumber = (section: HTMLElement): void => {
  const items = section.querySelectorAll('*[data-number]') as NodeListOf<Element>

  items.forEach((element: Element): void => {
    const item = element as HTMLElement

    if (!item) return

    const number = Number(item.dataset.number)
    const step: number = item.dataset.numberStep ? Number(item.dataset.numberStep) : 0.5
    const time: number = item.dataset.numberTime ? Number(item.dataset.numberTime) * 1000 : 1000
    const fixed: number = item.dataset.numberFixed ? Number(item.dataset.numberFixed) : 0
    const timer: number = Math.round(time / (number / step))
    let sum = 0

    const interval: NodeJS.Timer = setInterval((): void => {
      sum += step

      switch (sum >= number) {
      case true: {
        item.innerHTML = String(number.toFixed(fixed))
        clearInterval(interval)
        break
      }

      case false: {
        item.innerHTML = String(sum.toFixed(fixed))
        break
      }
      }
    }, timer)
  })
}

const scrollToNumbers = (): void => {
  const section = document.querySelector('*[data-section]') as HTMLElement

  if (section && window.screen.height >= section.getBoundingClientRect().top) {
    setOutNumber(section)
    document.removeEventListener('scroll', scrollToNumbers as EventListener)
  }
}

export default (): void => document.addEventListener('scroll', scrollToNumbers as EventListener)

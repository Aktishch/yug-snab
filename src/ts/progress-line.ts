import { scrolledPage } from './functions/scrolled-page'

const setProgressLineWidth = (): void => {
  const progressLine = document.querySelector('*[data-progress-line]') as HTMLElement

  if (!progressLine) return

  progressLine.style.width = `${Math.floor(
    (scrolledPage().top / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  )}%`
}

export default (): void => document.addEventListener('scroll', setProgressLineWidth as EventListener)

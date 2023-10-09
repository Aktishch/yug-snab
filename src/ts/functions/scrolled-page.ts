import { coordinates } from './coordinates'

export const scrolledPage = (): coordinates => {
  const coordinates: coordinates = {
    top:
      (window && window.scrollY && window.self.pageYOffset) ||
      (document.documentElement && document.documentElement.scrollTop),
    left:
      (window && window.scrollX && window.self.pageXOffset) ||
      (document.documentElement && document.documentElement.scrollLeft),
  }

  return coordinates
}

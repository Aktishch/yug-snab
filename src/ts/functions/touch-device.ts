declare global {
  interface Navigator {
    msMaxTouchPoints: number
  }
}

const init = (): boolean => {
  return 'ontouchstart' in window || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
}

export default { init }

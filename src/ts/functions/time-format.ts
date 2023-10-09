export const timeFormat = (number: number): string => {
  switch (number < 10 || number === 0) {
  case true: {
    return `0${number}`
  }

  case false: {
    return `${number}`
  }
  }
}

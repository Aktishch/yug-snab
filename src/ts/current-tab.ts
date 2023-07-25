const init = (): void => {
  const title = document.querySelector('title') as HTMLTitleElement

  if (!title) return

  const text: string | null = title.textContent
  let timer: NodeJS.Timeout

  window.addEventListener('blur', ((): void => {
    timer = setTimeout((): void => {
      title.innerText = 'Вы покинули страницу'
    }, 5000)
  }) as EventListener)

  window.addEventListener('focus', ((): void => {
    clearTimeout(timer)
    title.innerText = String(text)
  }) as EventListener)
}

export default { init }

const init = () => {
  const cards = document.querySelectorAll('.parallax__card')

  cards.forEach((card) => {
    const limits = 10
    const speed = 0.05
    let rotateY = 0
    let rotateX = 0
    let currentY = 0
    let currentX = 0

    card.addEventListener('mousemove', (e) => {
      const event = e as MouseEvent
      const rect = (event.target as HTMLElement)?.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const offsetX = x / rect.width
      const offsetY = y / rect.height

      currentX = offsetY * (limits * 2) - limits
      currentY = offsetX * (limits * 2) - limits

      card.style.setProperty('--rotateY', rotateY + 'deg')
      card.style.setProperty('--rotateX', rotateX + 'deg')

      // rotateY = offsetX * (limits * 2) - limits
      // rotateX = offsetY * (limits * 2) - limits
    })

    card.addEventListener('mouseleave', (e) => {
      currentY = 0
      currentX = 0
      rotateY = 0
      rotateX = 0

      card.style.setProperty('--rotateY', rotateY + 'deg')
      card.style.setProperty('--rotateX', rotateX + 'deg')
    })

    const set3D = () => {
      const initialY = currentY - rotateY
      const initialX = currentX - rotateX

      rotateY += initialY * speed
      rotateX += initialX * speed

      console.log(rotateY)

      // card.style.setProperty('--rotateY', rotateY + 'deg')
      // card.style.setProperty('--rotateX', rotateX + 'deg')

      window.requestAnimationFrame(set3D)
    }

    window.requestAnimationFrame(set3D)
  })
}

export default { init }

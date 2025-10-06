const playBtn = document.getElementById('play-btn')
const playerCountSelect = document.getElementById('player-count')
const instructionsBtn = document.getElementById('instructions-btn')
const popup = document.getElementById('popup-overlay')
const closePopup = document.querySelector('.close-popup')

playBtn.addEventListener('click', () => {
    const players = playerCountSelect.value
    window.location.href = `../GameTab/game.html?players=${players}`
})



instructionsBtn.addEventListener('click', () => {
    popup.style.display = 'block'
})

closePopup.addEventListener('click', () => {
    popup.style.display = 'none'
})

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none'
    }
})

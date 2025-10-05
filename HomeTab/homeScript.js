const playBtn = document.getElementById('play-btn')
const playerCountSelect = document.getElementById('player-count')

playBtn.addEventListener('click', () => {
    const players = playerCountSelect.value
    window.location.href = '../GameTab/index.html'
})

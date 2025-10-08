// Get player count from URL
const urlParams = new URLSearchParams(window.location.search)
let numberOfPlayers = parseInt(urlParams.get('players'))

// Game state variables
let players = []
let currentPlayerIndex = 0
let gameWon = false

const snakes = {
    16: 6,   
    47: 26,  
    49: 11,  
    56: 53,  
    62: 19,  
    64: 60,  
    87: 24,  
    93: 73,  
    95: 75,  
    98: 78   
}

const ladders = {
    1: 38,  
    4: 14,   
    9: 31,   
    21: 42,  
    28: 84,  
    36: 44,  
    51: 67, 
    71: 91,  
    80: 100  
}

// Get HTML elements
const diceValueElement = document.getElementById('dice-value')
const rollDiceButton = document.getElementById('roll-dice')
const currentPositionElement = document.getElementById('current-position')
const resetButton = document.getElementById('reset-btn')

const getPlayerColor = (index) => {
    const colors = ['red', 'blue', 'green', 'yellow']
    return colors[index]
}

// Get token corner position
const getTokenPosition = (playerIndex) => {
    const positions = [
        { top: '5px', right: '5px' },      // Player 1: top-right
        { top: '5px', left: '5px' },       // Player 2: top-left
        { bottom: '5px', left: '5px' },    // Player 3: bottom-left
        { bottom: '5px', right: '5px' }    // Player 4: bottom-right
    ]
    return positions[playerIndex]
}

// Create all players at start
const initializePlayers = (count) => {
    players = []
    for (let i = 0; i < count; i++) {
        players.push({
            id: i + 1,
            position: 0,
            color: getPlayerColor(i),
            name: `Player ${i + 1}`
        })
    }
}

// Roll dice and return number
const rollDice = () => {
    let rollNum = Math.floor(Math.random() * 6) + 1 // from treehouse
    
    // Bonus roll if you get 6
    if (rollNum === 6 || rollNum === 12) {
        theGift = Math.floor(Math.random() * 6) + 1
        rollNum += theGift
    } else if (rollNum === 18) {
        rollNum = 0
    }
    
    return rollNum 
}

// Move current player by dice value
const movePlayer = (diceValue) => {
    const player = players[currentPlayerIndex]

    // Remove old token from board
    if (player.position > 0) {
        const currentSquare = document.getElementById(`square-${player.position}`)
        const oldToken = currentSquare.querySelector(`.player-token.player-${player.id}`)
        if (oldToken) {
            oldToken.remove()
        }
    }
    
    // Calculate new position
    let newPosition = player.position + diceValue
    
    // Bounce back if over 100
    if (newPosition > 100) {
        const overshoot = newPosition - 100
        newPosition = 100 - overshoot
    }

    // Check for snakes
    if (snakes[newPosition]) {
        alert(`${player.name}: Snake! Sliding down from ${newPosition} to ${snakes[newPosition]}` )
        newPosition = snakes[newPosition]
    } 
    // Check for ladders
    else if (ladders[newPosition]) {
        alert(`${player.name}: Ladder! Climbing up from ${player.position + diceValue} to ${ladders[player.position + diceValue]} `)
        newPosition = ladders[player.position + diceValue]
    }
    
    // Update player position
    player.position = newPosition
    
    // Add new token to board
    if (player.position > 0) {
        const newSquare = document.getElementById(`square-${player.position}`)
        const playerToken = document.createElement('div')
        playerToken.classList.add('player-token', `player-${player.id}`)

        // Position token in corner
        const cornerPos = getTokenPosition(currentPlayerIndex)
        playerToken.style.top = cornerPos.top  
        playerToken.style.bottom = cornerPos.bottom   
        playerToken.style.left = cornerPos.left  
        playerToken.style.right = cornerPos.right 
        
        newSquare.appendChild(playerToken)
    }
    
    // Update position display
    currentPositionElement.innerHTML = player.position
    
    // Check if player won
    if (player.position === 100) {
        alert(`${player.name} Wins! Winner Winner Chicken Dinner!`)
        gameWon = true
        rollDiceButton.disabled = true
    }
}

// Switch to next player's turn
const switchPlayer = () => {
    currentPlayerIndex = (currentPlayerIndex + 1) % numberOfPlayers
    const currentPlayer = players[currentPlayerIndex]

    // Update current player display
    const currentPlayerElement = document.getElementById('current-player')
    currentPlayerElement.innerHTML = currentPlayer.name
    currentPlayerElement.style.color = currentPlayer.color
}

// Reset game to starting state
const resetGame = () => {
    // Remove all tokens from board
    players.forEach(player => {
        if (player.position > 0) {
            const square = document.getElementById(`square-${player.position}`)
            const token = square.querySelector(`.player-token.player-${player.id}`)
            if (token) {
                token.remove()
            }
        }
    })
    
    // Reset game state
    initializePlayers(numberOfPlayers)
    currentPlayerIndex = 0
    gameWon = false
    
    // Reset UI elements
    rollDiceButton.disabled = false
    diceValueElement.innerHTML = '-'
    currentPositionElement.innerHTML = '0'
    
    const currentPlayerElement = document.getElementById('current-player')
    currentPlayerElement.innerHTML = 'Player 1'
    currentPlayerElement.style.color = 'red'
    
    alert("Game Reset!")
}


rollDiceButton.addEventListener('click', () => {
    if (gameWon) return
    
    const diceValue = rollDice()
    diceValueElement.innerHTML = diceValue

    movePlayer(diceValue)
    
    if (!gameWon) {
        switchPlayer()  
    }
})

resetButton.addEventListener('click', () => {
    resetGame()
})


initializePlayers(numberOfPlayers)

// Show/hide player slots based on player count
for (let i = 1; i <= 4; i++) {
    const playerElement = document.getElementById(`player-${i}`)
    if (i > numberOfPlayers) {
        playerElement.style.display = 'none'  
    } else {
        playerElement.style.display = 'block'  
    }
}

let players = []
let currentPlayerIndex = 0
// let numberOfPlayers = 4  // Default to 2, will get from URL later
let gameWon = false

// Get player count from URL
const urlParams = new URLSearchParams(window.location.search)
let numberOfPlayers = parseInt(urlParams.get('players')) 
console.log('Number of Players from URL:', numberOfPlayers)


const snakes = {
    16: 6,   
    47: 26,  
    49: 11,  
    56: 53,  
    62: 19,  
    64 : 60,  
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
    80 : 100  
}
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

const getPlayerColor = (index) => {
    const colors = ['red', 'blue', 'green', 'yellow']
    return colors[index]
}

const getTokenPosition = (playerIndex) => {
    const positions = [
        { top: '5px', right: '5px' },      // Player 1: top-right
        { top: '5px', left: '5px' },       // Player 2: top-left
        { bottom: '5px', left: '5px' },    // Player 3: bottom-left
        { bottom: '5px', right: '5px' }    // Player 4: bottom-right
    ]
    return positions[playerIndex]
}


const diceValueElement = document.getElementById('dice-value')
const rollDiceButton = document.getElementById('roll-dice')
const currentPositionElement = document.getElementById('current-position')
const resetButton = document.getElementById('reset-btn')

const rollDice = () => {
    let rollNum =0
    rollNum= Math.floor(Math.random() * 6) + 1 // from treehouse
    
    console.log("-- Before 6 12 condition --->>> ",rollNum)

    if (rollNum === 6 ||rollNum === 12 ){
        theGift=Math.floor(Math.random() * 6) +1
        rollNum += theGift
        console.log("-- INSIDe 6 12 condition --->>> ",theGift)
        console.log("-- INSIDe 6 12 condition --->>> ",rollNum)
    }else if(rollNum === 18){
        rollNum = 0
        //then go to the next PLayer
    }
    return rollNum 
}

const movePlayer = (diceValue) => {
    const player = players[currentPlayerIndex]

    console.log('=== MOVE PLAYER ===')
    console.log('Current Player:', player.name)
    console.log('Player ID:', player.id)
    console.log('Player Color:', player.color)
    console.log('Current Position:', player.position)
    console.log('Dice Value:', diceValue)

    if (player.position > 0) {
        const currentSquare = document.getElementById(`square-${player.position}`)
        const oldToken = currentSquare.querySelector(`.player-token.player-${player.id}`)
        if (oldToken) {
            oldToken.remove()
        }
    }
    
    let newPosition = player.position + diceValue
    
    if (newPosition > 100) {
        const overshoot = newPosition - 100
        newPosition = 100 - overshoot
    }

    if (snakes[newPosition]) {
        alert(`${player.name}: Snake! Sliding down from ${newPosition} to ${snakes[newPosition]}`)
        newPosition = snakes[newPosition]
    } else if (ladders[newPosition ]) {
        alert(`${player.name}: Ladder! Climbing up from ${player.position + diceValue} to ${ladders[player.position + diceValue]}`)
        newPosition = ladders[player.position + diceValue]
    }
    
    
    player.position = newPosition
    
    if (player.position > 0) {
        const newSquare = document.getElementById(`square-${player.position}`)
        const playerToken = document.createElement('div')
        playerToken.classList.add('player-token', `player-${player.id}`)

        const cornerPos = getTokenPosition(currentPlayerIndex)

        playerToken.style.top = cornerPos.top || 'auto' 
        playerToken.style.bottom = cornerPos.bottom || 'auto' 
        playerToken.style.left = cornerPos.left || 'auto' 
        playerToken.style.right = cornerPos.right || 'auto' 
        newSquare.appendChild(playerToken)
    }
    
    currentPositionElement.innerHTML = player.position
    
    if (player.position === 100) {
        alert(`${player.name} Wins!Winner Winner Chicken Dinner!`)
        gameWon = true
        rollDiceButton.disabled = true
    }

    console.log('===================\n')

}
const switchPlayer = () => {
    // Move to next player (cycles: 0 → 1 → 2 → 3 → 0...)
    console.log('--- SWITCHING PLAYER ---')
    console.log('Old Player Index:', currentPlayerIndex)

    currentPlayerIndex = (currentPlayerIndex + 1) % numberOfPlayers
    console.log('New Player Index:', currentPlayerIndex)
    const currentPlayer = players[currentPlayerIndex]

    console.log('Next Player:', currentPlayer.name)
    console.log('Player Color:', currentPlayer.color)
    
    const currentPlayerElement = document.getElementById('current-player')
    currentPlayerElement.innerHTML = currentPlayer.name
    currentPlayerElement.style.color = currentPlayer.color
    console.log('------------------------\n')

}



rollDiceButton.addEventListener('click', () => {
    if (gameWon) return
    
    const diceValue = rollDice()
    diceValueElement.innerHTML = diceValue
    console.log(`Rolled: ${diceValue}`)

    movePlayer(diceValue)
    if (!gameWon) {
        switchPlayer()  
    }
})
resetButton.addEventListener('click', () => {
    resetGame()
})


// Phase 2: Multiple player functions
// const switchPlayer = () => {
//     currentPlayerIndex = (currentPlayerIndex + 1) % numberOfPlayers
// }

const resetGame = () => {
    players.forEach(player => {
        if (player.position > 0) {
            const square = document.getElementById(`square-${player.position}`)
            const token = square.querySelector(`.player-token.player-${player.id}`)
            if (token) {
                token.remove()
            }
        }
    })
    
    initializePlayers(numberOfPlayers)
    currentPlayerIndex = 0
    gameWon = false
    
    rollDiceButton.disabled = false
    diceValueElement.innerHTML = '-'
    currentPositionElement.innerHTML = '0'
    
    const currentPlayerElement = document.getElementById('current-player')
    currentPlayerElement.innerHTML = 'Player 1'
    currentPlayerElement.style.color = 'red'
    
    alert("Game Reset!")
}



// Start the game with 2 players min
initializePlayers(numberOfPlayers)
for (let i = 1; i <= 4; i++) {
    const playerElement = document.getElementById(`player-${i}`)
    if (i > numberOfPlayers) {
        playerElement.style.display = 'none'  
    } else {
        playerElement.style.display = 'block'  
    }
}

// Phase 4: Animation functions


// Phase 5: Sound effects
// const playDiceSound = () => {
//     // Play dice roll sound
// }

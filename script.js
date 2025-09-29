let currentPosition = 0
let gameWon = false

// Phase 2: Multiple players
// let players = [] 
// let numberOfPlayers = 2

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

const diceValueElement = document.getElementById('dice-value')
const rollDiceButton = document.getElementById('roll-dice')
const currentPositionElement = document.getElementById('current-position')

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
    if (currentPosition > 0) {
        const currentSquare = document.getElementById(`square-${currentPosition}`)
        const token = currentSquare.querySelector('.player-token')
        if (token) {
            token.remove()
        }
    }
    
    let newPosition = currentPosition + diceValue
    
    if (newPosition > 100) {
        const overshoot = newPosition - 100
        newPosition = 100 - overshoot
    }
    
    // Phase 3: Check snakes and ladders
    // if (snakes[newPosition]) {
    //     newPosition = snakes[newPosition]
    //     console.log("Snake! Sliding down...")
    // } else if (ladders[newPosition]) {
    //     newPosition = ladders[newPosition]
    //     console.log("Ladder! Climbing up...")
    // }
    if (snakes[newPosition]) {
        alert(`Snake bite You! Sliding down from ${newPosition} to ${snakes[newPosition]}`)
        newPosition = snakes[newPosition]
    } else if (ladders[newPosition ]) {
        alert(`Ladder! Climbing up from ${currentPosition + diceValue} to ${ladders[currentPosition + diceValue]}`)
        newPosition = ladders[currentPosition + diceValue]
    }
    
    
    currentPosition = newPosition
    
    if (currentPosition > 0) {
        const newSquare = document.getElementById(`square-${currentPosition}`)
        const playerToken = document.createElement('div')
        playerToken.classList.add('player-token')
        newSquare.appendChild(playerToken)
    }
    
    currentPositionElement.innerHTML = currentPosition
    
    if (currentPosition === 100) {
        alert("Winner Winner Chicken Dinner!")
        gameWon = true
        rollDiceButton.disabled = true
    }
}

rollDiceButton.addEventListener('click', () => {
    if (gameWon) return
    
    const diceValue = rollDice()
    diceValueElement.innerHTML = diceValue
    
    console.log(`Rolled: ${diceValue}`)
    movePlayer(diceValue)
})

// Phase 2: Multiple player functions
// const switchPlayer = () => {
//     currentPlayerIndex = (currentPlayerIndex + 1) % numberOfPlayers
// }

// Phase 3: Reset game function
// const resetGame = () => {
//     currentPosition = 0
//     gameWon = false
// }

// Phase 4: Animation functions


// Phase 5: Sound effects
// const playDiceSound = () => {
//     // Play dice roll sound
// }

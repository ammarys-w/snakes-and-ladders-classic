# snakes-and-ladders-classic

## by Ammar Yaser Marhonn Shabib
---
## Description:
Snakes and Ladders is a simple board game for 2 or to 4. The goal is to move your piece from square 1 to square 100 by rolling a dice. If you land at the bottom of a ladder, you climb up to a higher square. If you land on a snake’s head, you slide down to a lower square. You must roll the exact number to reach square 100 to win;  if your roll is too high,  you bounce back.
---
## How to Get Started
1. Open the file game in any web browser you like.
2. Pick how many players will play and start the game 2 to 4 players.
3. Click the dice button to take turns rolling and move your pieces.
4. Try to be the first player to land on square 100 to win !.
---
## Wireframe
![photo 1](https://i.postimg.cc/qvtdFwmt/Screenshot-2025-09-22-202101.png)
![photo 2](https://i.postimg.cc/FRxtSBK6/Screenshot-2025-09-22-200616.png)
---
## Pseudocode 
1. Initialize the game board with 100 squares numbered 1 to 100 .

2. Define the positions of snakes and ladders:
   - Map snake heads to their tails.
   - Map ladder bottoms to their tops .

3. Initialize players ( 2 - 4 ), setting the positions to 0 .

4. Set current player to Player 1 ( first player ).

5. Repeat this point, until a player *wins*:

   a. Prompt current player to roll the dice.

   b. Generate a dice roll ( 1 - 6 )

   c. Calculate newPosition = currentPosition + diceRoll

   d. If new position > 100 :
       . Calculate bounce back steps = newposition - 100.
       . Newposition = 100 - bounce back steps.

   e. Check if new position corresponded to a snake or ladder:
       . If snake head, move down to  the tail.
       . If ladder bottom, move up to top.

   f. Update player's position to new position.

   g. If player reached exactly square 100:
        . Declare player X as winner.
        . End game loop.

   h. Otherwise, switch turn to next player.

#### The End
---

## Credits
  - Shraddha Singh’s JavaScript Snakes and Ladders tutorial on Hashnode  
    https://shradhasingh.hashnode.dev/javascript-snakes-and-ladders-game-tutorial
  - Algomaster design guide  
    https://algomaster.io/learn/lld/design-snake-and-ladder



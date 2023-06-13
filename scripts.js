const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const xButton = document.querySelector('.x');
const oButton = document.querySelector('.o');

//step 1

const initializeGame = () => {
    Gameboard.gameboardGenerator();
    playerGeneration.generatePlayersPublic();
    Gameflow.turnCounterReset();
    xButton.disabled = true;
    oButton.disabled = true;
}

startButton.addEventListener('click', () => {
    initializeGame();
    startButton.disabled = true;
    restartButton.disabled = false;
});

restartButton.addEventListener('click', () => {
    initializeGame();
});

xButton.addEventListener('click' , () => {
    playerGeneration.getPlayerOneMarker() = 'X'
});

oButton.addEventListener('click' , () => {
    playerGeneration.getPlayerOneMarker() = 'O'
});

/*

1. done!
1.1. The x-o button picker should be stored in a thing that can be changed until the "start" button is pressed
1.1.1 When start is pressed, it should get the X/O picked button variable thingy, disable the two buttons until the game ends, and use it as player 1's marker in the object constructor
1.2. The "restart button" should be disabled at the start bcuz no board yet, and should be enabled once a board exists.

start.Button
1.3. done! the "start button"'s addEvent listener should have a DOM function that creates a 3x3 grid with divs that you can click on to store "x" or "o"
1.3.1 done! The click should also then be reported to the gameboard array(the array inside a gameboard object)
2. done! Create gameBoard module and gameboard grid using the addEventListener in the "start" button (the restart can delete the current grid and regenerate it i guess)
*/

const Gameboard = (() => {
    let gameboard = []
    const _gameboardSquareFactory = (squareCoordinates, marker) => {
        return { squareCoordinates, marker }
    };

    const _gameboardObjectGenerator = () => {
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                const row = 'row' + i;
                const column = 'column' + j;
                const squareCoordinates = row + column;

                const square = _gameboardSquareFactory(squareCoordinates, null)
                gameboard.push(square);
            }
        }
    }

    const _generateGrid = () => {
        let gridContainer = document.getElementById('gameboardContainer')
        let divCreator = document.createElement('div')
    
        gridContainer.innerHTML = '';
    
        for (let i = 1; i <= 3; i++) {
            let row = divCreator.cloneNode();
            row.classlist.add('row')
    
            for (let j = 1; j <= 3; j++) {
                let cell = divCreator.cloneNode();
                cell.classList.add('cell');
                cell.id = 'row' + i + 'column' + j;
    
                cell.addEventListener('click', () => {
                    let clickedObject = gameboard.find(obj => obj.location === cell.id);
                    let turnCounter = getTurnCounter();
                    let currentPlayerMarker = Gameflow.getCurrentPlayerMarker();

                    turnCounter++

                    if (clickedObject) {
                        Object.assign(clickedObject, currentPlayerMarker);
                        cell.textContent =  currentPlayerMarker;
                        cell.disabled = true;
                    }

                    Gameflow.getSwitchTurnFunction()
                });
                row.appendChild(cell);
            }
    
            gridContainer.appendChild(row);
        }
    }

    const gameboardGenerator= () => {
        gameboard = []

        _gameboardObjectGenerator();
        _generateGrid()

    }

    const getGameboard = () => {
        return gameboard
    };

    return {
        gameboardGenerator,
        getGameboard
    };
})();

/*

2.1 create array inside a Gameboard object (done!)
2.1.1 store gameboard inside array (done!)
2.2. create a factory function that creates the objects of the 9 squares (done!)
2.2.1 The objects should have properties that are the ff (done!):
2.2.2.1. a "location" property with a value that tells us where in the grid it is (e.g. location: row1column1)
2.2.2.2. a "mark" property with a value that starts as "blank" but can either be "blank, x or o"
2.3. create a grid that is 3x3(done!) 
2.3.1. each square in the div should have a class that is the same as the value of the location property of an object created in the factory function that creates the gameboard (done!).
2.3.2. It should have an addEventListener  done!
2.3.2.1. that gives an "x" or "o" as its content when clicked done!
2.3.2.2. as well as an Object.assign with target being the clicked div and the source being the "marker" of the player who clicked it
2.3.2.3. the click should also disable clicking the div again.
3. create display controller */

const infoDisplayController = (() => {
    /*
    Put the ff:
    Current number of turns display
    Whose turn it is
    popup in center that shows the result of the game (that will be imported from gameflow)
    */


})();

const Gameflow = (() => {
    let turnCounter = 0


    const getTurnCounter = () => {
        return turnCounter
    }

    const turnCounterReset = () => {
        turnCounter = 0
    }

    const getCurrentPlayerName = () => {
        const currentPlayerIndex = playerGeneration.getPlayerIndex;
        const playerArray = playerGeneration.getPlayerArray;

        const currentPlayer = playerArray[currentPlayerIndex];
        
        return currentPlayer ? currentPlayer.name : null;
    };

    const getCurrentPlayerMarker = () => {
        const currentPlayerIndex = playerGeneration.getPlayerIndex;
        const playerArray = playerGeneration.getPlayerArray;

        const currentPlayer = playerArray[currentPlayerIndex];
        
        return currentPlayer ? currentPlayer.marker : null;
    };

    const _switchTurn = () => {
        const currentPlayerIndex = playerGeneration.getPlayerIndex;
        const playerArray = playerGeneration.getPlayerArray;

        currentPlayerIndex = (currentPlayerIndex + 1) % playerArray.length;

        return currentPlayerIndex;
    }

    const getSwitchTurnFunction = () => {
        return _switchTurn
    }

    const checkEndGame = () => {
        const gameboard = Gameboard.getGameboard();
    
        // Check if turnCounter reaches 9
        if (turnCounter === 9) {
          return true; // Game ends in a tie
        }
    
        // Check rows
        for (let i = 1; i <= 3; i++) {
          const row = gameboard.filter(obj => obj.squareCoordinates.includes('row' + i));
          if (row.length === 3 && row.every(obj => obj.marker === row[0].marker && obj.marker !== null)) {
            return true; // Game ends with a row victory
          }
        }
    
        // Check columns
        for (let i = 1; i <= 3; i++) {
          const column = gameboard.filter(obj => obj.squareCoordinates.includes('column' + i));
          if (column.length === 3 && column.every(obj => obj.marker === column[0].marker && obj.marker !== null)) {
            return true; // Game ends with a column victory
          }
        }
    
        // Check diagonals
        const diagonal1 = gameboard.filter(obj => obj.squareCoordinates.includes('row1square1') || obj.squareCoordinates.includes('row2square2') || obj.squareCoordinates.includes('row3square3'));
        const diagonal2 = gameboard.filter(obj => obj.squareCoordinates.includes('row1square3') || obj.squareCoordinates.includes('row2square2') || obj.squareCoordinates.includes('row3square1'));
        if ((diagonal1.length === 3 && diagonal1.every(obj => obj.marker === diagonal1[0].marker && obj.marker !== null)) || (diagonal2.length === 3 && diagonal2.every(obj => obj.marker === diagonal2[0].marker && obj.marker !== null))) {
          return true; // Game ends with a diagonal victory
        }
    
        return false; // Game not ended yet
      };

      const getEndGameChecker = () => {
        return checkEndGame
      }

      const endGameLogic {
        
      }
    
      // ...
    
    return {
        getTurnCounter,
        getCurrentPlayerMarker,
        getCurrentPlayerName,
        getSwitchTurnFunction,
        turnCounterReset,
        getEndGameChecker

    };

})();

/* 
4. create object to control flow of game
4.1. have a thing that determines whose turn is it.
4.2. have a property "turns" that increments by 1 every time a div is clicked
4.3. create logic that ends game (either turns = 9 or access the array above and check if appropriate arrays for a victory are marked)
4.3.1 display the result in a div (with the display being either [name of player] wins or "tie")

*/

const playerGeneration = (() => {
    const playerArray = [];
    const playerFactory = (name, marker) => {
        return { name, marker }
    };
    let playerOneMarker = 'X'
    let currentPlayerIndex = 0

    const getPlayerOneMarker = () => {
        return playerOneMarker
    }

    const getPlayerIndex = () => {
        return currentPlayerIndex
    }

    const getPlayerArray = () => {
        return playerArray;
    }

    const _generatePlayers = () => {
        for (let i = 1; i <= 2; i++) {
            let name = "player" + i;
            let marker = playerOneMarker === 'X' ? (i === 1 ? 'X' : 'O') : (i === 1 ? 'O' : 'X');
            let player = playerFactory(name, marker);
            playerArray.push(player);
        }
    };

    const generatePlayersPublic = () => {
        return _generatePlayers;
    }

    return {
        generatePlayersPublic,
        getPlayerOneMarker,
        getPlayerArray,
        getPlayerIndex
    }
})();

/* 
5.1. With the start button's addeventlistener, have the  factory function create 2 objects with the ff properties and values
5.1.1. Player name, which has a valueis either player 1 or player two
5.1.2. marker, whose "value" for players 1 and 2 depends on the variable stored above for the buttons x and o
6. (do this later) allow it to create AI Also.



*/


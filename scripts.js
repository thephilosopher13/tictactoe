const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const xButton = document.querySelector('.x');
const oButton = document.querySelector('.o');

//step 1

startButton.addEventListener('click', () => {
    Gameflow.initializeGame();
    startButton.disabled = true;
    restartButton.disabled = false;
});

restartButton.addEventListener('click', () => {
    Gameflow.initializeGame();
    startButton.disabled = true;
});

xButton.addEventListener('click' , () => {
    playerGeneration.setPlayerOneMarker('X');
});

oButton.addEventListener('click' , () => {
    playerGeneration.setPlayerOneMarker('O');
});

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
                const defaultMarkerValue = ''

                const square = _gameboardSquareFactory(squareCoordinates, defaultMarkerValue)
                gameboard.push(square);
            }
        }
    }

    const _addCellClickListener = (cell) => {
        cell.addEventListener('click', () => {
          let clickedObject = gameboard.find(
            (obj) => obj.squareCoordinates === cell.id
          );
          let currentPlayerMarker = Gameflow.getCurrentPlayerMarker();
      
          if (clickedObject && (clickedObject.marker === null || clickedObject.marker === '') && !cell.textContent) {
            Gameflow.incrementTurnCounter();
            clickedObject.marker = currentPlayerMarker;
            cell.textContent = currentPlayerMarker;
            cell.disabled = true;
      
            const hasGameEnded = Gameflow.getEndGameChecker().result;
            const switchTurn = Gameflow.getSwitchTurnFunction();
      
            if (hasGameEnded === true) {
                Gameflow.getEndGameLogic();
            } else {
                switchTurn();
            }
      
            infoDisplayController.updateDisplayGenerator();
          } else {
            return
          }
        });
      };

    const _generateGrid = () => {
        let gridContainer = document.getElementById('gameboardContainer')
        let divCreator = document.createElement('div')
    
        gridContainer.innerHTML = '';
    
        for (let i = 1; i <= 3; i++) {
            let row = divCreator.cloneNode();
            row.classList.add('row')
    
            for (let j = 1; j <= 3; j++) {
                let cell = divCreator.cloneNode();
                cell.classList.add('cell');
                cell.classList.add('divstransparent')
                cell.id = 'row' + i + 'column' + j;
                row.appendChild(cell);
            }
    
            gridContainer.appendChild(row);
        }

        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            _addCellClickListener(cell);
            cell.classList.remove('divstransparent');
            cell.classList.add('divsopaque');
        });
    };

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

const infoDisplayController = (() => {

    const _generateInfoDisplay = () => {
        let divCreator = document.createElement('div');
        const currentPlayerDiv = divCreator.cloneNode();
        const infoContainer = document.getElementById('infodisplay');

        infoContainer.innerHTML = ''

        currentPlayerDiv.id = 'currentPlayerDiv'; // Add an ID for easy access
        currentPlayerDiv.textContent = `Current turn: ${Gameflow.getCurrentPlayerName()}`;

        const turnCounterDiv = divCreator.cloneNode();
        turnCounterDiv.id = 'turnCounterDiv'; // Add an ID for easy access
        turnCounterDiv.textContent = `Turns passed: ${Gameflow.getTurnCounter()}`;

        infoContainer.appendChild(currentPlayerDiv);
        infoContainer.appendChild(turnCounterDiv);
    }

    const getInfoDisplayGenerator = () => {
        return _generateInfoDisplay()
    }

    const updateDisplayGenerator = () => {
        const currentPlayerDiv = document.getElementById('currentPlayerDiv');
        const turnCounterDiv = document.getElementById('turnCounterDiv');

        currentPlayerDiv.textContent = `Current turn: ${Gameflow.getCurrentPlayerName()}`;
        turnCounterDiv.textContent = `Turns: ${Gameflow.getTurnCounter()}`;
    }

    return {
        getInfoDisplayGenerator,
        updateDisplayGenerator
    }




})();

const Gameflow = (() => {
    let turnCounter = 0
    let currentPlayerIndex = 0

    const getTurnCounter = () => {
        return turnCounter
    }

    const incrementTurnCounter = () => {
        turnCounter++
    }

    const turnCounterReset = () => {
        turnCounter = 0
    }

    const initializeGame = () => {
        turnCounterReset();
        currentPlayerIndex = 0
        enableCells();
        Gameboard.gameboardGenerator();
        playerGeneration.generatePlayersPublic();
        infoDisplayController.getInfoDisplayGenerator();
        xButton.disabled = true;
        oButton.disabled = true;
    };

    const getCurrentPlayerName = () => {
        const playerArray = playerGeneration.getPlayerArray();

        const currentPlayer = playerArray[currentPlayerIndex];
        
        return currentPlayer ? currentPlayer.name : null;
    };

    const getCurrentPlayerMarker = () => {
        const playerArray = playerGeneration.getPlayerArray();

        const currentPlayer = playerArray[currentPlayerIndex];
        
        return currentPlayer ? currentPlayer.marker : null;
    };

    const _switchTurn = () => {
        var playerArray = playerGeneration.getPlayerArray();

        currentPlayerIndex = (currentPlayerIndex + 1) % playerArray.length;

        return currentPlayerIndex;
    }

    const getSwitchTurnFunction = () => {
        return _switchTurn
    }

    const disableCells = () => {
        const cells = document.querySelectorAll('.cell')
            cells.forEach((cell) => {
                cell.disabled = true
            });
    };
    

    const checkEndGame = () => {
        const gameboard = Gameboard.getGameboard();
    
        // Check if turnCounter reaches 9
        if (turnCounter === 9) {
          return { result: true, tie: true }; 
        }
    
        // Check rows
        for (let i = 1; i <= 3; i++) {
          const row = gameboard.filter(obj => obj.squareCoordinates.includes('row' + i));
          if (row.length === 3 && row.every(obj => obj.marker === row[0].marker && obj.marker !== '')) {
            return { result: true, tie: false }; // Game ends with a row victory
          }
        }
    
        // Check columns
        for (let i = 1; i <= 3; i++) {
          const column = gameboard.filter(obj => obj.squareCoordinates.includes('column' + i));
          if (column.length === 3 && column.every(obj => obj.marker === column[0].marker && obj.marker !== '')) {
            return { result: true, tie: false }; // Game ends with a column victory
          }
        }
    
        // Check diagonals
        const diagonal1 = gameboard.filter(obj => obj.squareCoordinates === 'row1column1' || obj.squareCoordinates === 'row2column2' || obj.squareCoordinates === 'row3column3');
        const diagonal2 = gameboard.filter(obj => obj.squareCoordinates === 'row1column3' || obj.squareCoordinates === 'row2column2' || obj.squareCoordinates === 'row3column1');
        if ((diagonal1.length === 3 && diagonal1.every(obj => obj.marker === diagonal1[0].marker && obj.marker !== '')) || (diagonal2.length === 3 && diagonal2.every(obj => obj.marker === diagonal2[0].marker && obj.marker !== ''))) { 
            return { result: true, tie: false }; // Game ends with a diagonal victory
}
    
        return { result: false, tie: false }; // Game not ended yet
      };

      const getEndGameChecker = () => {
        return checkEndGame();
      }
      

      const _endGameLogic = () => {
        const gameEnded = checkEndGame();
        const currentPlayerName = getCurrentPlayerName();
        const popupModal = document.querySelector('.endgamepopupmodal');
        const resultText = document.querySelector('.endgamedescription')

        popupModal.style.display = "block";
        
        popupModal.addEventListener('click', (e) => {
            if (e.target === popupModal) {
              popupModal.style.display = "none";
            }
        });

        startButton.disabled = false;
        xButton.disabled = false;
        oButton.disabled = false;
        disableCells();

        if (gameEnded.result) {
            if (gameEnded.tie) {
                resultText.textContent = `It's a tie!`
            } else {
                resultText.textContent = `${currentPlayerName} wins!`
            }
        }
        return 
      }

      const getEndGameLogic = () => {
        return _endGameLogic();
      }

      const enableCells = () => {
        const cells = document.querySelectorAll('.cell')
        cells.forEach((cell) => {
            cell.disabled = false
        });
      }
    
      // ...
    
    return {
        getTurnCounter,
        getCurrentPlayerMarker,
        getCurrentPlayerName,
        getSwitchTurnFunction,
        turnCounterReset,
        getEndGameChecker,
        getEndGameLogic,
        initializeGame,
        incrementTurnCounter
    };

})();

const playerGeneration = (() => {
    const playerArray = [];
    const playerFactory = (name, marker) => {
        return { name, marker }
    };
    let playerOneMarker = 'X'

    const setPlayerOneMarker = (marker) => {
        playerOneMarker = marker;
    };

    const getPlayerArray = () => {
        return playerArray;
    }

    const _generatePlayers = () => {
        for (let i = 1; i <= 2; i++) {
            let name = "Player" + i;
            let marker = playerOneMarker === 'X' ? (i === 1 ? 'X' : 'O') : (i === 1 ? 'O' : 'X');
            let player = playerFactory(name, marker);
            playerArray.push(player);
        }
    };

    const generatePlayersPublic = () => {
        return _generatePlayers();
    }

    return {
        generatePlayersPublic,
        setPlayerOneMarker,
        getPlayerArray,
    }
})();


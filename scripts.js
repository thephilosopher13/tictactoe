const startButton = document.getElementsByClassName('start');
const restartButton = document.getElementsByClassName('restart');
const xButton = document.getElementsByClassName('x');
const oButton = document.getElementsByClassName('o');

const rowCreator = document.createElement('div')

//step 1
startButton.addEventListener('click', () => {} )
restartButton.addEventListener('click', () => {} )
xButton.addEventListener('click' , () => {})

oButton.addEventListener('click' , () => {})
/*

1. done!
1.1. The x-o button picker should be stored in a thing that can be changed until the "start" button is pressed
1.1.1 When start is pressed, it should get the X/O picked button variable thingy, disable the two buttons until the game ends, and use it as player 1's marker in the object constructor
1.2. The "restart button" should be disabled at the start bcuz no board yet, and should be enabled once a board exists.

start.Button
1.3. the "start button"'s addEvent listener should have a DOM function that creates a 3x3 grid with divs that you can click on to store "x" or "o"
1.3.1 The click should also then be reported to the gameboard array(the array inside a gameboard object)
2. Create gameBoard module and gameboard grid using the addEventListener in the "start" button (the restart can delete the current grid and regenerate it i guess)

const Gameboard = (() => {
    let gameboard = []
    const _gameboardSquareFactory = (squareCoordinates, marker) => {
        return { squareCoordinates, marker }
    };

    const gameboardGenerator= () => {
        gameboard = []

        for (let let i = 1; 1 <= 3; i++) {
            for (let j = 1; j <= 3l j++) {
                const row = 'row' + i;
                const column = 'column' + j;
                const squareCoordinates = row + column;

                const square = gameboardSquareFactory(squareCoordinates, null)
                gameboard.push(square);
            }
        }
    }

    const getGameboard = () => {
        return gameboard
    };

    return {
        gameboardGenerator,
        getGameboard
    };
})();

2.1 create array inside a Gameboard object (done!)
2.1.1 store gameboard inside array (done!)
2.2. create a factory function that creates the objects of the 9 squares (done!)
2.2.1 The objects should have properties that are the ff (done!):
2.2.2.1. a "location" property with a value that tells us where in the grid it is (e.g. location: row1column1)
2.2.2.2. a "mark" property with a value that starts as "blank" but can either be "blank, x or o"
2.3. create a grid that is 3x3

function generateGrid() {
    let gridContainer = document.getElementById('gameboardContainer')
    let divCreator = document.createElement('div')

    gridContainer.innerHTML = '';

    for (let i = 1; 1 <= 3; i++) {
        let row = divCreator.cloneNode();
        row.classlist.add('row')

        for (let j = 1; j <= 3; j++) {
            let cell = divCreator.cloneNode();
            cell.classList.add('cell');
            cell.id = 'row' + i + 'column' + j;

            cell.addEventListener('click', () => {
                let currentGameboard = Gameboard.getGameboard();
                let clickedObject = currentGameboard.find(obj => obj.location === cell.id);

                if (clickedObject) {
                    
                }
            });
            row.appendChild(cell);
        }

        gridContainer.appendChild(row);
    }
}

function getObjectByLocation = (location sho)

 
2.3.1. each square in the div should have a class that is the same as the value of the location property of an object created in the factory function that creates the gameboard (done!).
2.3.2. It should have an addEventListener 
2.3.2.1. that gives an "x" or "o" as its content when clicked
2.3.2.2. as well as an Object.assign with target being the clicked div and the source being the "marker" of the player who clicked it
2.3.2.3. the click should also disable clicking the div again.
3. create display controller
4. create object to control flow of game
4.1. have a thing that determines whose turn is it.
4.2. have a property "turns" that increments by 1 every time a div is clicked
4.3. create logic that ends game (either turns = 9 or access the array above and check if appropriate arrays for a victory are marked)
4.3.1 display the result in a div (with the display being either [name of player] wins or "tie")
const playerFactory = (name, marker) => {
    const playerArray=[]
    return { name, marker }
};
5.1. With the start button's addeventlistener, have the  factory function create 2 objects with the ff properties and values
5.1.1. Player name, which has a valueis either player 1 or player two
5.1.2. marker, whose "value" for players 1 and 2 depends on the variable stored above for the buttons x and o
6. (do this later) allow it to create AI Also.



*/


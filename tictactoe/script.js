const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

// for the first turn
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {

        // reseting the game
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)

        // each cell can be clicked only once
        cell.addEventListener('click', handleClick, { once: true })

    })
    setBoardHoverClass()

    // reseting the game
    winningMessageElement.classList.remove('show')


}

function handleClick(e) {
    // class that we clicked on
    const cell = e.target
        // current class
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        // placemark
    placeMark(cell, currentClass)

    // check for win
    if (checkWin(currentClass)) {
        // win
        endgame(false)
    } else if (isDraw()) {
        // draw
        endgame(true)
    } else {
        // switch turns
        swapTurns()
            // apply hover states
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    // remove the previous class
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
        // get the next turn and add hover
    if (circleTurn)
        board.classList.add(CIRCLE_CLASS)
    else
        board.classList.add(X_CLASS)
}

// if every single cell inside of the combination is correct for at least one of the winning combination, then we win
function checkWin(currentClass) {
    // return true if any of the givn combination is true by looping over all of the winning combinations
    return WINNING_COMBINATIONS.some(combination => {
        // if all the values in the cell elements have the same class
        return combination.every(index => {
            // checking each cell have the current class
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endgame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn? "O" : "X" } Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    // check if every single cell has a class
    // destructure cellElements into an array, since cellElements does not have an every method
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}
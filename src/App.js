import React, {useState, useEffect} from "react";
import ScoreBoard from "./components/ScoreBoard";
import blueCandy from './images/blue-candy.png';
import greenCandy from './images/green-candy.png';
import orangeCandy from './images/orange-candy.png';
import purpleCandy from './images/purple-candy.png';
import redCandy from './images/red-candy.png';
import yellowCandy from './images/yellow-candy.png';
import blank from './images/blank.png';

// setting some constants 
const width = 8;
const candyColors = [
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy
]

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  // check for column of four funciton
  const checkForColumnsOfFour = () => {
    for (let i = 0; i <= 39; i++){
      const columnOfFour = [i, i +width, i+ width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }
  // check for rows of four function
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++){
      const rowOfFour = [i, i+ 1, i += 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score += 4)
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }
  // check for a column of three funciton
  const checkForColumnsOfThree = () => {
    for (let i = 0; i <= 47; i++){
      const columnOfThree = [i, i +width, i+ width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score += 3)
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true 
      }
    }
  }
  // check for rows of three function
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++){
      const rowOfThree = [i, i+ 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score += 3)
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
      }
    }
  }
  // move squarefunctions 
  // move below
  const moveintoSquareBelow = () => {
    for (let i = 0; i <= 55 - width; i++ ) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if ((currentColorArrangement[i + width]) === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }
  // score display function
  console.log(scoreDisplay)

  // functions for dragging and dropping
  // drag start
  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }
  // drag drop
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }
  // drag end
  const dragEnd = () => {

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute("data-id"))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute("data-id"))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute("src")
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src")

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour = checkForColumnsOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnsOfThree()
    const isARowOfThree = checkForRowOfThree()

    // check if the square being replaced is valid or not 
    if (squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
  } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute("src")
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute("src")
      setCurrentColorArrangement([...currentColorArrangement])
  }
  }

  // create board function
  const createBoard = () => {
    const randomColorArrangement = []
    // mapp through the colours array to produce an 8x8 board (64 squares) of random colours
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }
  // use effect for create board function 
  useEffect(() => {
    createBoard()
  }, [])
  // use effect for the checking/re-render of columns of three and four
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnsOfFour()
      checkForRowOfFour()
      checkForColumnsOfThree()
      checkForRowOfThree()
      moveintoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 200)
    return () => clearInterval(timer)

  }, [checkForColumnsOfThree, checkForColumnsOfFour, checkForRowOfThree, checkForRowOfFour, moveintoSquareBelow, currentColorArrangement])

  // console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay}/>
    </div>
  )
}

export default App;

import React, {useState, useEffect} from "react";

const width = 8;
const candyColors = [
  "blue",
  "green",
  "purple",
  "red",
  "yellow"
]

const App = () => {
  const [currentColorArrangement, setColorArrangment] = useState([]);

  // check for column of four funciton
  const checkForColumnsOfFour = () => {
    for (let i = 0; i < 39; i++){
      const columnOfFour = [i, i +width, i+ width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = "")
      }
    }
  }
  // check for rows of four function
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++){
      const rowOfFour = [i, i+ 1, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArrangement[square] = "")
      }
    }
  }
// check for a column of three funciton
  const checkForColumnsOfThree = () => {
    for (let i = 0; i < 47; i++){
      const columnOfThree = [i, i +width, i+ width * 2]
      const decidedColor = currentColorArrangement[i]

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = "")
      }
    }
  }
  // check for rows of three function
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++){
      const rowOfThree = [i, i+ 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = "")
      }
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
    setColorArrangment(randomColorArrangement)
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
      setColorArrangment([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)

  }, [checkForColumnsOfThree, checkForColumnsOfFour, checkForRowOfThree, checkForRowOfFour,currentColorArrangement])

  console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
            />
        ))}
      </div>
    </div>
  )
}

export default App;

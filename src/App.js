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

  const createBoard = () => {
    const randomColorArrangement = []

    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setColorArrangment(randomColorArrangement)
  }
  
  useEffect(() => {
    createBoard()
  }, [])

  console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            style={{backgroundColor: candyColor}}
            />
        ))}
      </div>
    </div>
  )
}

export default App;

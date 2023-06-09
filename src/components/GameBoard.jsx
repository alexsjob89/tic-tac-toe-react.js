import React,{useState} from 'react';
import Square from './Square';

function GameBoard() {
 const initialSquares = Array(9).fill(null);
 const [squares, setSquares] = useState(Array(9))
 const [xIsNext, setXIsNext] = useState(true)

 const restartGame = () => {
  setSquares(initialSquares);
  setXIsNext(true);
};


 const handleClick = (i) => {
   const squaresCopy = squares.slice()
   if (calculateWinner(squaresCopy) || squaresCopy[i]){
    return;
   }
   squaresCopy[i] = xIsNext ? 'X' : '0'
   setSquares(squaresCopy)
   setXIsNext(!xIsNext)
 }

 const renderSquare = (i) => {
   return <Square value={squares[i]} onClick={() => handleClick(i)}/>
 }

 const winner = calculateWinner(squares)
 let status;
 if (winner) {
  status = 'winner: ' + winner;
 } else {
  status = 'Next player: ' + (xIsNext ? 'X' : '0');
 }


  return (
    <div className='game-board'>
           <div className="status">{status}</div>
           <button onClick={restartGame}>
            Restart Game
           </button>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}
function calculateWinner(squares) {
 const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
 ]

 for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i]
  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
   return squares[a];
  }
 }
}

export default GameBoard
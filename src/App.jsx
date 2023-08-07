import { useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom } from './LOGIC/board'

import confetti from "canvas-confetti"
import { WinnerModal } from './components/WinnerModal.jsx'



function App() {

  const [board,setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] =useState(TURNS.X)
  const [winner,setWinner] = useState(null)


  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard)=>{
    return newBoard.every((square)=>square !==null)
  }
  
  const updateBoard = (index)=>{

    if (board[index] || winner)return
    const newBoard =[...board]
    newBoard[index]=turn
    setBoard(newBoard)
    const newTurn = turn===TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner= checkWinnerFrom(newBoard)

    if(newWinner){
      setWinner(newWinner)
      confetti()
    }else if(checkEndGame(newBoard)){
      setWinner(false)//Empate
    }

  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((_,index)=>{
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              > 
                {_}
              </Square>
            ) 
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

     
    </main>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame} from './Game'
import Board from './Board'
import {Timer, ExpiredNotice} from './Timer'

function App() { 
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
     setBoard(game.board)
     setIsGameOver(game.isGameOver)
     setResult(game.result)
     setTurn(game.turn)
   })
    return () => subscribe.unsubscribe()
  }, []) 

  const msTime = 1000 * 10
  const now = new Date().getTime()
  const msCountdown = msNow + now

  return (
    <div className='container'>
      {isGameOver && (
        <h2 className='vertical-text'>
          GAME OVER
          <button onClick={resetGame}>
            <span className='vertical-text'>
              NEW GAME
            </span>
          </button>
        </h2>
      )}
      <div className='board-container'>
        <Board board={board} turn={turn} />
      </div>
      <div className='timer-container'>
        <Timer targetTime={msCountdown} />
      </div>
      {result && <p className='vertical-text'>{result}</p>}
    </div>
    
  )
}

export default App

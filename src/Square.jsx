import React from 'react'

export default function Square({ children, white }) {
  const bgClass = white ? 'square-white' : 'square-black'
  
  return (
    <div className={`${bgClass} board-square`}>
      {children}
    </div>
  )
}

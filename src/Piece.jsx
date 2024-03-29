import React from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'

const value = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: null
}

export default function Piece({ piece: { type, color }, position }) {
  const [{isDragging}, drag, preview] = useDrag({
    type: 'piece', 
    item: {id: `${position}_${type}_${color}`},
    value: {value},
    collect: (monitor) => {
      return {isDragging: !!monitor.isDragging()}
    }
  })
  const pieceImg = require(`./assets/${type}_${color}.png`)
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg}/>
      <div className='piece-container' ref={drag} style={{opacity: isDragging ? 0 : 1}}>
        <img src={pieceImg} alt = '' className='piece'/>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import Square from './Square'
import Piece from './Piece'
import { useDrop } from 'react-dnd'
import { handleMove } from './Game'
import { gameSubject } from './Game'
import Promote from './Promote'
import useCaptured from './useCaptured'

export default function BoardSquare({ 
  piece, 
  white, 
  position,
 }) {
  const [promotion, setPromotion] = useState(null)
  const [handleCapture] = useCaptured()
  const [score, setScore] = useState([0,0])
  

  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      const [fromPosition] = item.id.split('_')
      const move = handleMove(fromPosition, position)
      if (move) {
        // handleCapture(move.color, move.captured);
        if (move.color === 'w' && move.captured) {
          console.log('White captures')
          setScore(score[0] += 1)
      } else if (move.color === 'b' && move.captured){
          console.log('Black captures')
          setScore(score[1] += 1)
      }
      console.log(move.color, move.captured, score)
      }
    },
  })
  useEffect(()=>{
    const subscribe = gameSubject.subscribe(
      ({ pendingPromotion }) => 
      pendingPromotion && pendingPromotion.to === position 
      ? setPromotion(pendingPromotion) 
      : setPromotion(null)
    )
    return () => subscribe.unsubscribe()
  }, [position])
  return (
    <div className='board-square' ref={drop}>
        <Square white={white}>
          {promotion ? (
          <Promote promotion={promotion} /> 
          ) : piece ? (
            <Piece 
              piece={piece}
              position={position}
            />
          ) : null}
        </Square>
    </div>
  )
}
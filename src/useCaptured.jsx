import { useState } from 'react'

export function useCaptured() {
    const [score, setScore] = useState([0,0])
    
    const handleCapture = (color, piece) => {
        console.log(color, piece)
        if (color === 'w') {
            console.log('White captures')
            setScore(score[0] += 1)
        } else if (color === 'b'){
            console.log('Black captures')
            setScore(score[1] += 1)
        }
        console.log(score)
    }

    return [handleCapture, score]
}

export default useCaptured
import { Chess } from 'chess.js'
import { BehaviorSubject } from 'rxjs'
import { Timer, ExpiredNotice } from './Timer'

let promotion = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
let stalemate = '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78'
let checkmate = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQ - 1 3'
let lackMaterial = 'k7/8/n7/8/8/8/8/7K b - - 0 1'

const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export function initGame() {
    // const savedGame = localStorage.getItem('savedGame')
    // if (savedGame) {
    //     chess.load(savedGame)
    // }
    updateGame()
}

export function resetGame() {
    chess.reset()
    updateGame()
}

export function handleMove(from, to) {
    const promotions = chess.moves({verbose: true}).filter(m=>m.promotion)
    console.table(promotions)
    if (promotions.some(p=>`${p.from}:${p.to}`=== `${from}:${to}`)) {
        console.log('The user is going to promote')
        const pendingPromotion = {from, to, color: promotions[0].color}
        updateGame(pendingPromotion)
    }
    const { pendingPromotion } = gameSubject.getValue()
    if (!pendingPromotion) {
        move(from, to)
    }
}

export function move(from, to, promotion) {
    let tempMove = {from, to}
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)
    
    if (legalMove) {
        updateGame()
    }
}

function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over()
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }
    localStorage.setItem('savedGame', chess.fen())
    
    gameSubject.next(newGame)
}

function getGameResult(){
    if (Timer.ExpiredNotice === 'Expired!'){
        chess.game_over()
        const winner = chess.turn()==="w" ? 'BLACK' : 'WHITE'
        return `TIME - WINNER - ${winner}`
    }
    if (chess.in_checkmate()) {
        const winner = chess.turn()==="w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - WINNER - ${winner}`
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if(chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = 'INSUFFICIENT MATERIAL'
        }
        return `DRAW - ${reason}`
    } else {
        return 'UNKNOWN REASON'
    }
}

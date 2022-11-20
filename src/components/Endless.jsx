import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import gameMove from '../audio/gameMove.mp3'
import computerError from '../audio/computerError.mp3'
import { getSliderUtilityClass } from '@mui/base'

const Endless = ({ lines, side, square }) => {
    const [possiblePositions, setPossiblePositions] = useState('')
    const [possibleEnds, setPossibleEnds] = useState('')
    const [chess, setChess] = useState(new Chess())

    useEffect(()=>{
        let openingArr = []
        let possiblePos = []
        let possibleEnd = []
        for (let item in lines.openings){
            openingArr.push(lines.openings[item])
        }
        for (let i = 0; i < openingArr.length; i++){
            for(let item in openingArr[i]){
                possiblePos.push(item)
                possibleEnd.push(...openingArr[i][item])
            }
        }
        possiblePos = possiblePos.filter(x=>getSide(x) === side)
        let tempChess = new Chess()
        let index = Math.floor(Math.random() * possiblePos.length)
        tempChess.loadPgn(possiblePos[index])
        setPossibleEnds(possibleEnd)
        setPossiblePositions(possiblePos)
        setChess(tempChess)
    },[lines, side])

    //function to help filter possiblePositions for the selected side
    const getSide = (pos) => {
        let tempChess = new Chess()
        tempChess.loadPgn(pos)
        return tempChess.turn() === 'b' ? 'black' : 'white'
    }

    const onDrop = (from, to) => {
        let copy = new Chess()
        copy.loadPgn(chess.pgn())
        let isValid
        copy.move({ from, to }) ? isValid = true : isValid = false
        if(isValid){
            if (possibleEnds.includes(copy.pgn())){
                let audio = new Audio(gameMove)
                audio.play()
                let tempChess = new Chess()
                let index = Math.floor(Math.random() * possiblePositions.length)
                tempChess.loadPgn(possiblePositions[index])
                setChess(tempChess)
            } else {
                let audio = new Audio(computerError)
                audio.play()
            }
        } else {
            let audio = new Audio(computerError)
            audio.play()
        }
    }

    return (
        <Box>
            <Chessboard boardOrientation={side} boardWidth={square * 0.8} position={chess.fen()} onPieceDrop={onDrop}/>
        </Box>
    )
}

export default Endless
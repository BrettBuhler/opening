import { Box } from '@mui/system'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import { useEffect, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import gameMove from '../audio/gameMove.mp3'
import computerError from '../audio/computerError.mp3'
import audioBack from '../audio/audioBack.mp3'

/*
The Endless component lets users play random positions from all lines saves to the database.
*/
const Endless = ({ lines, side, square, userInfo }) => {
    const [possiblePositions, setPossiblePositions] = useState('')
    const [possibleEnds, setPossibleEnds] = useState('')
    const [chess, setChess] = useState(new Chess())

    //from lines, get all possible moves in each lines.openings array
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

    //checks if the user's move is valid, if it is, set a new random position, if not, play an error
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
                if (tempChess.pgn() === chess.pgn()){
                    while (tempChess.pgn() === chess.pgn()){
                        index = Math.floor(Math.random() * possiblePositions.length)
                        tempChess = new Chess()
                        tempChess.loadPgn(possiblePositions[index])
                    }
                }
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

    //skips current possition and returns new random position, then checks if random position is equal to the current position, if it is
    //get a new random position.
    const handleSkip = () => {
        let tempChess = new Chess()
            let index = Math.floor(Math.random() * possiblePositions.length)
            tempChess.loadPgn(possiblePositions[index])
            if (tempChess.pgn() === chess.pgn()){
                while (tempChess.pgn() === chess.pgn()){
                    index = Math.floor(Math.random() * possiblePositions.length)
                    tempChess = new Chess()
                    tempChess.loadPgn(possiblePositions[index])
                }
            }
            let audio = new Audio(audioBack)
            audio.play()
            setChess(tempChess)
    }
    //endless is only terminated when the user selects go home from the bottom bar
    return (
        <Box>
            <TopBar login={false} userInfo={userInfo} menuName={'Endless Chess'}/>
            <Box className={'chessBox'}>
                <Chessboard boardOrientation={side} boardWidth={square * 0.8} position={chess.fen()} onPieceDrop={onDrop}/>
            </Box>
            <BottomBar width={square* 0.8} buttons={[['Skip', handleSkip]]}/>
            <div id={'menu-background-pattern'}></div>
            <div id={'menu-background-img'}></div>
        </Box>
    )
}

export default Endless
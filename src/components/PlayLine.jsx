import React from 'react'
import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import WinScreen from './WinScreen'
import computerError from '../audio/computerError.mp3'
import gameMove from '../audio/gameMove.mp3'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import { Box } from '@mui/system'

/**
 * PlayLine recieves an opening from the user, and a side (black/white)
 * The user makes a move, if that move is saved to the Line, the program will make the next move, prompting the user to make another move
 * Once the Line runs out of moves, and the user has made no mistakes, the user wins the game and is returned to the main menu
 * (This component is line specific, meaning that even if a move exists in another saved line but does not exist in the current line
 * , the component will not recognize the move as valid)
 */

const PlayLine = ({ width, height, line, side, userInfo, lineName }) => {

    const [chess, setChess] = useState(new Chess())

    useEffect(()=>{
        setChess(new Chess())
        if (side === 'black'){
            let copy = new Chess()
            copy.loadPgn(line[''][0])
            setChess(copy)
        }
    },[line, side])

    //sets size of chessboard relative to window size
    const square = width < height ? width : height

    //Checks to see if the user's move is contained in the selected line, if it's not, an error sound is played and the move is not made
    //If the user's move exists in the line, the program makes makes the next move and the user can then input their next move
    //If the current line is out of moves, the user has won
    const onDrop = (from, to) => {
        let copy = new Chess()
        let isValid
        let endLine = false
        copy.loadPgn(chess.pgn())
        copy.move({ from, to }) ? isValid = true : isValid = false
        if(isValid){
            if (line[chess.pgn()].includes(copy.pgn())){
                setChess(copy)
                let audio = new Audio(gameMove)
                if(!line[line[chess.pgn()]]){
                    alert('You finishd the Line!')
                    endLine = true
                    setChess(false)
                } else if (side === 'black'){
                    if(!line[line[line[chess.pgn()]]]){
                        alert('You finished the Line!')
                        endLine = true
                        setChess(false)
                    }
                }
                if (!endLine){
                    audio.play()
                    makeNextMove()
                }
            } else {
                let audio = new Audio(computerError)
                audio.play()
                if (side === 'black'){
                    let newChess = new Chess()
                    newChess.loadPgn(line[''][0])
                    setChess(newChess)
                } else {
                    setChess(new Chess())
                }
            }
        } else {
            let audio = new Audio(computerError)
            audio.play()
        }
    }

    //makes the next move in the line
    const makeNextMove = () => {
        let nextMove = line[chess.pgn()]
        let num = line[nextMove].length
        let index = Math.floor(Math.random() * num)
        if (line[nextMove][index]){
            let copy = new Chess()
            copy.loadPgn(line[nextMove][index])
            setChess(copy)
            //check if a next move is in the line, if not user has won and chess is set to false
            if (!line[copy.pgn()]){
                setChess(false)
            }
        } else {
            console.log('end')
        }
    }

    if (chess === false){
        return (
            <div>
                <WinScreen setChess={setChess}/>
            </div>
        )
    } else {
        return (
            <Box>
                <TopBar login={false} userInfo={userInfo} menuName={`Playing ${lineName}`}/>
                <Box className={'chessBox'}>
                    <Chessboard
                        boardWidth={square * 0.8}
                        onPieceDrop={onDrop}
                        position={chess.fen()}
                        boardOrientation={side}
                    />
                </Box>
                <BottomBar width={square* 0.8}/>
            </Box>
        )
    }
}

export default PlayLine
import React from 'react'
import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import WinScreen from './WinScreen'
import computerError from '../audio/computerError.mp3'
import gameMove from '../audio/gameMove.mp3'
import gameWin from '../audio/gameWin.mp3'
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
    const [hints, setHints] = useState([])

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
                if(!line[line[chess.pgn()][0]]){
                    audio = new Audio(gameWin)
                    audio.play()
                    endLine = true
                    setChess(false)
                } else if (side === 'black'){
                    if(!line[line[line[chess.pgn()][0]]]){
                        let audio = new Audio(gameWin)
                        audio.play()
                        endLine = true
                        setChess(false)
                    }
                }
                if (!endLine){
                    audio.play()
                    makeNextMove(copy.pgn())
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
    const makeNextMove = (pgn) => {
        let nextMove = line[pgn]
        let index
        if (nextMove){
            let num = nextMove.length
            if (num > 1){
                index = Math.floor(Math.random() * num)
            } else {
                index = 0
            }

            let copy = new Chess()
            copy.loadPgn(nextMove[index])
            if (line[copy.pgn()]){
                setChess(copy)
            } else {
                let audio = new Audio(gameWin)
                audio.play()
                setChess(false)
            }
        } else {
            let audio = new Audio(gameWin)
            audio.play()
            setChess(false)
        }
        
    }

    const getHint = () => {
        let copy = chess
        let nextMoves = line[copy.pgn()]
        nextMoves = nextMoves.map(x=>{
            let temp = new Chess()
            temp.loadPgn(x)
            const history = temp.history({ verbose: true })
            return [history[history.length - 1].from, history[history.length - 1].to]
        })
        setHints(nextMoves)
    }
    if (chess === false){
        return (
                <WinScreen setChess={setChess} userInfo={userInfo} setHints={setHints}  width={width} height={height} line={line} side={side} lineName={lineName} />
        )
    } else if (!line[chess.pgn()][0].length >= 1){
        return (
            <div>
                WIN
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
                        customArrows={hints}
                    />
                </Box>
                <BottomBar width={square* 0.8} buttons={[['Get Hint', getHint]]}/>
            <div id={'menu-background-pattern'}></div>
            <div id={'menu-background-img'}></div>
            </Box>
        )
    }
}

export default PlayLine
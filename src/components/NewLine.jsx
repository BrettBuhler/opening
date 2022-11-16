import React from 'react'
import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import computerError from '../audio/computerError.mp3'
import gameMove from '../audio/gameMove.mp3'
import audioBack from '../audio/audioBack.mp3'
import userService from '../services/chessList'

/**
 * The NewLine component renders an interactive chessboard where the user can input a new line.
 * Once the user is finished inputing thier line, they can click the "save line" button to have thier line saved
 * to the DataBase under their username (default username is guest).
 * Lines are color agnostic... meaning when a line is saved, the line can be played as either black or white.
 */

const NewLine = ({ user, lines, width, height }) => {
    //sets size of chessboard relative to window size
    const square = width < height ? width : height
    //init new chessboard
    const [chess, setChess] = useState(new Chess())
    //init empty array to hold the new line
    const [fenList, setFenList] = useState([])
    //init a bool state (true = white false = black)
    const [side, setSide] = useState(true)
    //store opening names that already exist in the data base
    //useEffect hooks to ensure component state is not overwriten
    useEffect (()=>{
        setChess(new Chess())
        setFenList([])
    },[])
    //getFen generates an exportable fen string from fenList (This is how lines are saved to the DB)
    const getFen = () => {
        const dict = {}
        for (let i = 0; i < fenList.length; i++){
            dict[fenList[i][0]] = [fenList[i][1]]
        }
        return dict
    }
    //onDrop updates the chessboard, and fenList if a legal move has been made
    const onDrop = (from, to) => {
        let copy = new Chess()
        copy.loadPgn(chess.pgn())
        copy.move({ from, to }) ? setChess(copy) : copy = false
        if(copy){
            const myFen = [...fenList]
            myFen.push([chess.pgn(), copy.pgn()])
            setFenList(myFen)
            let audio = new Audio(gameMove)
            audio.play()
        } else {
            let audio = new Audio(computerError)
            audio.play()
        }
        console.log(fenList)
        return copy
    }
    //returns current side
    const getSide = () => {
        if(!side){
            return 'black'
        }
        return 'white'
    }
    //toggles side
    const toggleSide = () => {
        setSide(!side)
    }
    //Undo a Move
    const handleBack = () =>{
        if (fenList.length == 0){
            let audio = new Audio(computerError)
            audio.play()
        } else {
            setFenList(fenList.slice(0, fenList.length - 1))
            let lastChess = new Chess()
            lastChess.loadPgn(fenList[fenList.length - 1][0])
            setChess(lastChess)
            let audio = new Audio(audioBack)
            audio.play()
        }
    }
    //Saves Line to DataBase
    const handleSave = () => {
        if (window.confirm(`Save this line under ${user}?`)){
            const name = window.prompt('Please give this line a unique name.')
            const openings = []
            for (let i in lines.openings){
                openings.push(i)
            }
            if (openings.includes(name)){
                console.error(`${name} is already saved, please try to save the line with a new name.`)
                alert(`"${name}" is already taken, please try again.`)
            } else {
                lines.openings[name] = getFen()
                userService.deleteUser(user).then(()=>{
                    userService.createUser(lines)
                })
                /**
                 * TODO: Implement React router to return to homePage after a new line is created
                 */
            }
        }
    }
    return (
        <div>
            <Chessboard
                boardWidth={square * 0.8}
                onPieceDrop={onDrop}
                position={chess.fen()}
                boardOrientation={getSide(side)}
            />
            <button className='sideButton button' onClick={toggleSide}>SIDE</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleBack}>Back</button>
        </div>
    )
}

export default NewLine
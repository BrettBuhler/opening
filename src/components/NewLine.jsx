import React from 'react'
import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import computerError from '../audio/computerError.mp3'
import gameMove from '../audio/gameMove.mp3'

/**
 * The NewLine component renders an interactive chessboard where the user can input a new line.
 * Before the component is rendered, the app will verify the user is logged in, and that the lines name does not
 * already exist. If the line already exists, the user will be returned to the main menu and see an error message.
 * Once the user is finished inputing thier line, they can click the "save line" button to have thier line saved
 * to the DataBase under their username.
 * Lines are color agnostic... meaning when a line is saved, the line can be played as either black or white.
 */

const NewLine = ({ user, width, height }) => {
    //sets size of chessboard relative to window size
    const square = width < height ? width : height
    //init new chessboard
    const [chess, setChess] = useState(new Chess())
    //init empty array to hold the new line
    const [fenList, setFenList] = useState([])
    //init a bool state (true = white false = black)
    const [side, setSide] = useState(true)
    //useEffect hooks to ensure component state is not overwriten
    useEffect (()=>{
        setChess(new Chess())
    },[])
    useEffect (()=> {
        setFenList([])
    },[])
    //getFen generates an exportable fen string from fenList
    const getFen = () => {
        const dict = {}
        for (let i = 0; i < fenList.length; i++){
            dict[fenList[i][0]] = fenList[i][1]
        }
        console.log(dict)
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
    //Saves Line to DataBase
    const handleSave = () => {
        if (window.confirm(`Save this line under ${user}?`)){
            const name = window.prompt('Please give this line a unique name.')
            console.log(name)
            //todo... implement feature to get lines from DB under user name, and save the new line to the DB if 
            //the line does not exist
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
        </div>
    )
}

export default NewLine
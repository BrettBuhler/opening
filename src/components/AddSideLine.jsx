import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import userService from '../services/chessList'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import gameMove from '../audio/gameMove.mp3'
import computerError from '../audio/computerError.mp3'


const AddSideLine = ({ line, userObject, displayPosition, square }) => {
    const [saved, setSaved] = useState(false)
    const [chess, setChess] = useState(displayPosition)
    const [fenList, setFenList] = useState([])

    const handleSave = () => {
        for (let item of fenList){
            if (userObject.openings[line][item[0]]){
                userObject.openings[line][item[0]].push(item[1][0])
            } else {
                userObject.openings[line][item[0]] = [item[1][0]]
            }
        }
        userService.deleteUser(userObject.userName).then((res)=>{
            if (res) {
                userService.createUser(userObject).then((res)=>{
                    if(res){
                        setSaved(true)
                    }
                })
            }
        })
    }
    /*
    onDrop checks to see if the user's move is valid, and checks if the user's move is already saved to the line
    if the move is valid and the move is not alrady saved, chessmove audio is played,
    fenList is updated, and the chessboard's state is changed. Else, play error audio.
    */
    const onDrop = (from, to) => {
        let copy = new Chess()
        copy.loadPgn(chess.pgn())
        copy.move({ from, to })
        if(copy){
            if (userObject.openings[line][copy.pgn()]){
                let audio = new Audio(computerError)
                audio.play()
            } else {
                let newFenList = [...fenList]
                newFenList.push([chess.pgn(), [copy.pgn()]])
                setFenList(newFenList)
                setChess(copy)
                let audio = new Audio(gameMove)
                audio.play()
            }
        } else {
            let audio = new Audio(computerError)
            audio.play()
        }
    }

    if (!saved){
        return (
            <Box>
                <Chessboard position={chess.fen()} boardWidth={square*0.8} onPieceDrop={onDrop} />
                <button onClick={handleSave}>Save</button>
            </Box>
        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default AddSideLine
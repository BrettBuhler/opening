import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import userService from '../services/chessList'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

const EditLine = ({ line, userObject, displayPosition, square }) => {
    const [saved, setSaved] = useState(false)
    const [chess, setChess] = useState(displayPosition)
    const [fenList, setFenList] = useState([])

    const genFen = (pgn) => {
        let relation = [pgn, userObject.openings[line][pgn]]
        let tempFenList = []
        tempFenList.push(relation)
        setFenList(tempFenList)
        //TODO finsih genFen algo
    }


    const onDrop = (from, to) => {
        let copy = new Chess()
        copy.loadPgn(chess.pgn())
        copy.move({ from, to }) ? setChess(copy) : copy = false
        if(copy){

        }
    }
    if (!saved){
        return (
            <Box>
                <Chessboard position={chess.fen()} boardWidth={square * 0.8} onPieceDrop={onDrop}/>
                <button onClick={()=>genFen('')}>Get Fen</button>
                <button onClick={()=>console.log(fenList)}>log fen</button>
            </Box>
        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default EditLine
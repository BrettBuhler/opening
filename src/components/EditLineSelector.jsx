import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { useState, useEffect } from 'react'
import MuiSelect from './MuiSelect'
import { Box, Button, Typography } from '@mui/material'
import EditLine from './EditLine'
import AddSideLine from './AddSideLine'

const EditLineSelector = ({ line, userObject, square, mode }) => {
    const [positions, setPositions] = useState([])
    const [displayPosition, setDisplayPosition] = useState(new Chess())
    const [positionSelected, setPositionSelected] = useState(false)

    const getPositions = () => {
        let newPositions = []
        for (let i in userObject.openings[line]){
            userObject.openings[line][i].map(x=>newPositions.push(x))
        }
        setPositions(newPositions)
    }

    const handleClick = () => {
        setPositionSelected(true)
    }

    useEffect(()=>{
        getPositions()
        setDisplayPosition(new Chess())
    },[])

    if (!positionSelected){
        return (
            <Box sx={{
                width: square * 0.8
            }}>
                <Typography variant='h4' sx={{textAlign: 'center', backgroundColor: '#ffffff'}}>Select Position</Typography>
                <Chessboard boardWidth={square * 0.8} position={displayPosition.fen()}/>
                <MuiSelect positions={positions} setDisplayPosition={setDisplayPosition}/>
                <Button fullWidth={true} onClick={handleClick}>Continue</Button>
            </Box>
        )
    } else if (mode == 'Edit Line') {
        return (
            <EditLine line={line} userObject={userObject} displayPosition={displayPosition} square={square}/>
        )
    } else {
        return (
            <AddSideLine line={line} userObject={userObject} displayPosition={displayPosition} square={square}/>
        )
    }
}

export default EditLineSelector
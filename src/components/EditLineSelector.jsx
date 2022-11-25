import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { useState, useEffect } from 'react'
import MuiSelect from './MuiSelect'
import { Box } from '@mui/material'
import EditLine from './EditLine'
import AddSideLine from './AddSideLine'
import TopBar from './TopBar'
import BottomBar from './BottomBar'

/*
Renders a select where the user can choose the position they want to edit. when a user picks a position, that position is rendered to a
chessboard.
*/

const EditLineSelector = ({ line, userObject, square, mode, userInfo}) => {
    const [positions, setPositions] = useState([])
    const [displayPosition, setDisplayPosition] = useState(new Chess())
    const [positionSelected, setPositionSelected] = useState(false)
    //gets possible positions from userObject
    const getPositions = () => {
        let newPositions = []
        for (let i in userObject.openings[line]){
            userObject.openings[line][i].map(x=>newPositions.push(x))
        }
        setPositions(newPositions)
    }
    //handles continue click
    const handleClick = () => {
        setPositionSelected(true)
    }
    //sets positions
    useEffect(()=>{
        getPositions()
        setDisplayPosition(new Chess())
    },[])

    if (!positionSelected){
        return (
            <Box>
                <TopBar userInfo={userInfo} login={false} menuName={'Select Position'}/>
                <Box className={'chessBox'}>
                    <Chessboard boardWidth={square * 0.8} position={displayPosition.fen()} arePiecesDraggable={false}/>
                </Box>
                <MuiSelect positions={positions} setDisplayPosition={setDisplayPosition} width={square * 0.8}/>
                <BottomBar buttons={[['Continue', handleClick]]} width={square * 0.8}/>
                <div id={'menu-background-pattern'}></div>
                <div id={'menu-background-img'}></div>
            </Box>
        )
        //if mode == 'Edit Line' reutrn editline component else return addsideline component
    } else if (mode === 'Edit Line') {
        return (
            <EditLine line={line} userObject={userObject} displayPosition={displayPosition} square={square} userInfo={userInfo}/>
        )
    } else {
        return (
            <AddSideLine line={line} userObject={userObject} displayPosition={displayPosition} square={square} userInfo={userInfo}/>
        )
    }
}

export default EditLineSelector
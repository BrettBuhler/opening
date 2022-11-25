import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import userService from '../services/chessList'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import gameMove from '../audio/gameMove.mp3'
import computerError from '../audio/computerError.mp3'
import TopBar from './TopBar'
import BottomBar from './BottomBar'

const EditLine = ({ line, userObject, displayPosition, square, userInfo }) => {
    const [saved, setSaved] = useState(false)
    const [chess, setChess] = useState(displayPosition)
    const [fenList, setFenList] = useState('')

    //sets the fenList to a an array usable by the onDrop function
    useEffect(()=>{
        setFenList(genFen(''))
    },[])

    // genFen returns a fenList up to the users select move to edit. This way the user can change a line at a certain move and discard
    // whatever moves come after the selected point.
    // The function is recursive and returns all branches of the Line that are not cut off by the users selected state.
    const genFen = (pgn, relations=[]) => {
        if (pgn === displayPosition.pgn()){
            return relations
        }
        let relation = genRelation(pgn)
        if (relation[1]){
            relations.push(relation)
            if (relations[relations.length - 1][1].length > 1){
                for (let i = 0; i < relations[relations.length - 1][1].length; i++){
                    relations.concat(genFen(relations[relations.length - 1][1][i], relations))
                }
            } else {
                relations.concat(genFen(relations[relations.length - 1][1][0], relations))
            }
        } else {
            return relations
        }
        return relations
    }

    // genRelation returns the next move from the line (if there is no next move, the funciton returns [str, undefined])
    const genRelation = (str) => {
        return [str, userObject.openings[line][str]]
    }

    //delete the old line from the database, upload the new line, set saved state to true
    const handleSave = () => {
        //format fenList into an exportable object
        let pgnObject = {}
        for (let item of fenList) {
            pgnObject[item[0]] = item[1]
        }
        userObject.openings[line] = pgnObject
        userService.deleteUser(userObject.userName).then((res)=>{
            if (res){
                userService.createUser(userObject).then(()=>{
                    setSaved(true)
                })
            }
        })
    }

    /*
    onDrop handles changes to the chess board. If the user input is valid, the function plays the chess move sound
    and saves the new move to the fenList. Last, the components chess state is updated to a new state where the move
    has been made.
    */
    const onDrop = (from, to) => {
        let copy = new Chess()
        copy.loadPgn(chess.pgn())
        copy.move({ from, to }) ? setChess(copy) : copy = false
        if(copy){
            let newFenList = [...fenList]
            newFenList.push([chess.pgn(), [copy.pgn()]])
            setFenList(newFenList)
            setChess(copy)
            let audio = new Audio(gameMove)
            audio.play()
        } else {
            let audio = new Audio(computerError)
            audio.play()
        }
    }
    /*
    If the user has not saved their edited line, render a chessboard.
    If the user has saved, return the user to the home route
    */
    if (!saved){
        return (
            <Box>
                <TopBar userInfo={userInfo} login={false} menuName={"Edit Line"}/>
                <Box className='chessBox'>
                    <Chessboard position={chess.fen()} boardWidth={square * 0.8} onPieceDrop={onDrop}/>
                </Box>
                <BottomBar width={square * 0.8} buttons={[['Save', handleSave]]}/>
                <div id={'menu-background-pattern'}></div>
                <div id={'menu-background-img'}></div>
            </Box>
        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default EditLine
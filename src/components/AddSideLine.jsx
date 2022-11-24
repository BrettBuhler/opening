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


const AddSideLine = ({ line, userObject, displayPosition, square, userInfo}) => {
    const [saved, setSaved] = useState(false)
    const [chess, setChess] = useState(displayPosition)
    const [fenList, setFenList] = useState([])

    const handleSave = () => {
        //update userObject to include the added sideline
        //Note** if a relation already exists in the line, the function will not overwrite the old relation, it will concat a new relation to the one that already exists.
        for (let i = 0; i < fenList.length; i++){
            if(userObject.openings[line][fenList[i][0]]){
                userObject.openings[line][fenList[i][0]] = userObject.openings[line][fenList[i][0]].concat(fenList[i][1])
            } else {
                userObject.openings[line][fenList[i][0]] = fenList[i][1]
            }
        }
        //Delete the user from the data base, and create a new user with the modified data
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
        //Make a new chess object, load it's state from the current chess object, make the move in the new chess object.
        let copy = new Chess()
        copy.loadPgn(chess.pgn())
        copy.move({ from, to })
        //if the move was valid
        if(copy){
            //if the move already exsits in the line do nothing and play an error
            if (userObject.openings[line][copy.pgn()]){
                let audio = new Audio(computerError)
                audio.play()
            //if the move does not exist, append a new relation to the fen list and play a success sound
            } else {
                let newFenList = [...fenList]
                newFenList.push([chess.pgn(), [copy.pgn()]])
                setFenList(newFenList)
                setChess(copy)
                let audio = new Audio(gameMove)
                audio.play()
            }
        //if the move is not valid, play an error sound and do nothing
        } else {
            let audio = new Audio(computerError)
            audio.play()
        }
    }

    //when the user presses the save button, the saved state is set to true.
    if (!saved){
        return (
        <Box>
            <TopBar userInfo={userInfo} login={false} menuName={"Add Side Line"}/>
            <Box className='chessBox'>
                <Chessboard position={chess.fen()} boardWidth={square * 0.8} onPieceDrop={onDrop}/>
            </Box>
            <BottomBar width={square * 0.8} buttons={[['Save', handleSave]]}/>
            <div id={'menu-background-pattern'}></div>
            <div id={'menu-background-img'}></div>
        </Box>
        )
    //after the user saves, return the user to the home page
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default AddSideLine
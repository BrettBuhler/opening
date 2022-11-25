import { Box } from "@mui/system"
import { useState } from "react"
import TopBar from "../components/TopBar"
import { Typography } from "@mui/material"
import { Navigate } from "react-router-dom"

/*
Renders a help page with a Home button
*/

const HelpRoute = ({userInfo}) => {
    const [goHome, setGoHome] = useState(false)
    const handleClick = () => {
        setGoHome(true)
    }
    const editLineText = `The Edit Line feature allows you to modify lines in the database. After clicking the Edit Line button, chose what line you want to edit from the menu. "Delete" will remove the selected line from the database, "Add Side-line" will let you fork a line, "Edit Line" will let you replace part of a line with a new sequence of moves, and "Help" brings you here. Add Side-line will and a new fork to the line, where Edit Line will overwrite a line from a selected position. If you select Add Side-line or Edit line, you will see a chessboard with a select menu below. Select the position you wish to edit from, then click the continue button. Then, input the edited line or side-line and click the save button to save the changes to the database.`
    const editLineText2 = `To better understand the difference between "Edit Line" and "Add Side-line" imagine a sequence of moves (1 => 2, 2 => 3, 3 => 4), adding a sideline from position two would give you multiple options at position 2 (1=> 2, 2=>(3 or 5), 3 => 4). Editing the line from position two would overwrite all moves after move one (1=>2, 2=>5, 5=>6). Note** if you edit a line after a fork all moves and sidelines before the position will be retained.`
    const generalInfoText = `Opening Master is a web application designed to help users memorize their opening lines, and add new lines to their opening repertoire. Opening Master does not evaluate moves or determine what "good" moves are.
To start, log in using a google account (The button on the top right of the Home page). If you don't have a google account or don't wish to sign up using one, feel free to continue as the default guest user. If you are not logged in, your lines can be overwritten or deleted by any user.`
    const newLineText = `The New Line feature allows users to save a new opening line. Use the interactive chess board to save a sequence of moves to the database. The chessboard will not allow you to make an illegal chess move.
    Four buttons will appear at the bottom of the chessboard. Press "Home" to return to the Home page without saving your line, "Undo" to undo the last move made to the chess board, and "Change Side" to change the orientation of the chess board (white to black and vice versa), and "Save" to save the line to the database. Each line must have a unique name.`
    const playLineText = `The Play Line feature lets you practice lines that are saved to the database. First, select the line you want to play, then select what side you want to play the line as (black or white). Last, make the chess moves you believe to be correct in the position. Remember, this app does not evaluate positions. If you save bad moves to the database, you will be practicing bad moves. If you make an error, the line will return to the first position and you will have to start over. If you're stuck, click the "Get Hint" button and an arrow will show you the correct move or moves. Once you have finished the line, a "victory" screen will be displayed, and you can choose to play the line again or return to the main menu.`
    const endlessText = `The Endless feature lets you practice random positions from the lines you have saved to the database. First, select what side you want to play as (black or white), then try to make the correct moves given the shown position. If you're stuck, press the skip button to move on to the next position. There is no winning in endless mode. Play as long as you like, and hit the home button to return to the main menu.`
    if (!goHome){
        return (
            <Box>
                <TopBar userInfo={userInfo} login={false} menuName={'Help'} id={'helpTopBar'}/>
                <Box className={'helpBox'}>
                    <button className={'helpHomeButton'} onClick={handleClick}>Return Home</button>
                    <Typography variant="h2" sx={{color: '#DCD7C9', ml: '5%', pt: '2%'}}>General Information</Typography>
                    <Typography variant="h6" sx={{color: '#DCD7C9', ml: '10%', width: "80%"}}>{generalInfoText}</Typography>
                    <Typography variant="h2" sx={{color: '#DCD7C9', ml: '5%', pt: '2%'}}>New Line</Typography>
                    <Typography variant="h6" sx={{color: '#DCD7C9', ml: '10%', width: "80%"}}>{newLineText}</Typography>
                    <Typography variant="h2" sx={{color: '#DCD7C9', ml: '5%', pt: '2%'}}>Edit Line</Typography>
                    <Typography variant="h6" sx={{color: '#DCD7C9', ml: '10%', width: "80%"}}>{editLineText}</Typography>
                    <Typography variant="h6" sx={{color: '#DCD7C9', ml: '10%', width: "80%"}}>{editLineText2}</Typography>
                    <Typography variant="h2" sx={{color: '#DCD7C9', ml: '5%', pt: '2%'}}>Play Line</Typography>
                    <Typography variant="h6" sx={{color: '#DCD7C9', ml: '10%', width: "80%"}}>{playLineText}</Typography>
                    <Typography variant="h2" sx={{color: '#DCD7C9', ml: '5%', pt: '2%'}}>Endless</Typography>
                    <Typography variant="h6" sx={{color: '#DCD7C9', ml: '10%', width: "80%"}}>{endlessText}</Typography>
                </Box>
                <Box className={'helpBackgroundBox'}>
                <div id={'menu-background-img'}></div>
                </Box>
            </Box>
        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default HelpRoute
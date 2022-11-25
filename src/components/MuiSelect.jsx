import { FormControl, Select, MenuItem, Box, } from "@mui/material"
import { useState } from "react"
import { Chess } from "chess.js"
import gameMove from '../audio/gameMove.mp3'

/*
MuiSelect is a custom component that builds upon Mui's basic select component
custom style and handleChange / selectMessage functions have been added.
*/

const MuiSelect = ({ positions, setDisplayPosition, width }) => {
    const [fen, setFen] = useState('')

    //sets fen to the selected option, and updates displayPosition
    const handleChange = (event) => {
        let chess = new Chess()
        chess.loadPgn(event.target.value)
        setFen(event.target.value)
        setDisplayPosition(chess)
        let audio = new Audio(gameMove)
        audio.play()
    }
    //sets default display message
    const selectMessage = () => {
        if (fen === ''){
            return (
                <div className={'selectMessage'}>Select a Position</div>
            )
        }
    }

    return (
        <Box sx={{mt: '5px'}} width={width} className={'muiSelectBox'}>
            {selectMessage()}
            <FormControl fullWidth>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    label="Position"
                    value={fen}
                    onChange={handleChange}
                    width={width}
                    sx={{color: '#DCD7C9', border: 0}}
                    variant='standard'
                >
                    {positions.map((x, i)=><MenuItem value={x} key={i}>{x}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}

export default MuiSelect
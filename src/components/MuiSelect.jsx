import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material"
import { useState, useEffect } from "react"
import { Chess } from "chess.js"
import gameMove from '../audio/gameMove.mp3'

const MuiSelect = ({ positions, setDisplayPosition }) => {
    const [fen, setFen] = useState('')

    
    const handleChange = (event) => {
        let chess = new Chess()
        chess.loadPgn(event.target.value)
        setFen(event.target.value)
        setDisplayPosition(chess)
        let audio = new Audio(gameMove)
        audio.play()
    }

    return (
        <Box sx={{mt: '5px'}}>
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">Position</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    label="Position"
                    value={fen}
                    onChange={handleChange}
                >
                    {positions.map((x, i)=><MenuItem value={x} key={i}>{x}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}

export default MuiSelect
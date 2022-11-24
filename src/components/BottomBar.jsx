import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/system'

const BottomBar = ({ width, showHome, buttons }) => {
    width -= 5
    const[goHome, setGoHome] = useState(false)
    const handleHome = ()=>{
        setGoHome(true)
    }
    if (!goHome){
        return (
            <Box className={'bottomBar'} style={{width: width}}>
                <button onClick={handleHome}>Home</button>
            </Box>
        )
    } else {
        return (
            <Navigate to={'/'} />
        )
    }
}

export default BottomBar
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/system'

const BottomBar = ({ width, buttons }) => {
    width -= 5
    const[goHome, setGoHome] = useState(false)

    const handleHome = ()=>{
        setGoHome(true)
    }


    if (!goHome){
        return (
            <Box className={'bottomBar'} style={{width: width}}>
                <button className={'bottomBarButton'} onClick={handleHome}>Home</button>
                {buttons.map((x,i)=><button className={'bottomBarButton'} onClick={x[1]} key={i}>{x[0]}</button>)}
            </Box>
        )
    } else {
        return (
            <Navigate to={'/'} />
        )
    }
}

export default BottomBar
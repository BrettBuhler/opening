import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/system'

/*
Bottom Bar renders a small bar under a chessboard that takes in a buttoms array.
The bar renders the buttons with custom text, and a custom onClick function. All Bottom Bars have a Home button by default.
*/

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
            <Navigate to={'/opening'} />
        )
    }
}

export default BottomBar
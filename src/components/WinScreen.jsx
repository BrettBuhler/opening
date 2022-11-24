import { Chess } from 'chess.js'
import Menu from './Menu'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import PlayLine from './PlayLine'


const WinScreen = ({ userInfo, setChess, width, height, line, side, lineName  }) => {
    const [option, setOption] = useState(false)

    if (!option){
        return (
            <Menu items={['Return Home', 'Play Again']} menuName={'You won!'} setOption={setOption} login={false} userInfo={userInfo}/>
        )
    } else if (option == 'Return Home') {
        return (
            <Navigate to={'/'} />
        )
    } else {
        return (
            <PlayLine
            width={width} height={height} line={line} side={side} userInfo={userInfo} lineName = {lineName}
            />
        )
    }
}

export default WinScreen
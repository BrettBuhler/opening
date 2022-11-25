import { useState } from 'react'
import Endless from '../components/Endless'
import Menu from '../components/Menu'
/*
Renders a menu that lets a user select what color they want to play
*/
const EndlessRoute = ({ lines, height, width, userInfo }) => {
    const [option, setOption] = useState(false)

    let square = height < width ? height : width
    if (!option){
        return (
            <Menu items={['Black', 'White']} menuName={'Select a color to play'} setOption={setOption} userInfo={userInfo} login={false}/>
        )
    } else {
        return (
            <Endless lines={lines} side={option.toLowerCase()} square={square} userInfo={userInfo}/>
        )
    }
}

export default EndlessRoute
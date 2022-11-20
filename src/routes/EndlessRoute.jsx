import { useState } from 'react'
import Endless from '../components/Endless'
import Menu from '../components/Menu'

const EndlessRoute = ({ lines, height, width }) => {
    const [option, setOption] = useState(false)

    let square = height < width ? height : width
    if (!option){
        return (
            <Menu items={['Black', 'White']} menuName={'Select a color to play'} setOption={setOption}/>
        )
    } else {
        return (
            <Endless lines={lines} side={option.toLowerCase()} square={square}/>
        )
    }
}

export default EndlessRoute
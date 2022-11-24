import PlayLine from '../components/PlayLine'
import { useState, useEffect } from 'react'
import Menu from '../components/Menu'

const PlayLineRoute = ({ width, height, line, userInfo}) => {
    const [selectedLine, setSelectedLine] = useState(false)
    const [openingList, setOpeningList] = useState([])
    const [side, setSide] = useState(false)

    //Function to set openings
    const getOpenings = () => {
        const temp = []
        for (let i in line){
            temp.push(i)
        }
        setOpeningList(temp)
    }

    //useEffect hook to call getOpenings on first component render
    useEffect(()=>{
        getOpenings()
    },[])


    if (selectedLine === false){
        return (
            <Menu items={openingList} menuName={'Select Line'} setOption={setSelectedLine} login={false} userInfo={userInfo}/>
        )
    } else if (side === false){
        return (
            <Menu items={['Black', 'White']} menuName={'Select a color to play'} setOption={setSide} userInfo={userInfo} login={false}/>
        )
    } else {
        return (
            <div>
                <PlayLine
                    width={width} height={height} line={line[selectedLine]} side={side.toLowerCase()} userInfo={userInfo} lineName = {selectedLine}
                />
            </div>
        )
    }
}

export default PlayLineRoute
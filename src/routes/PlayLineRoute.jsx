import PlayLine from '../components/PlayLine'
import { useState, useEffect } from 'react'
import Menu from '../components/Menu'

const PlayLineRoute = ({ width, height, line, side, userInfo}) => {
    const [selectedLine, setSelectedLine] = useState(false)
    const [openingList, setOpeningList] = useState([])

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
    } else {
        return (
            <div>
                <PlayLine
                    width={width} height={height} line={line[selectedLine]} side={side} userInfo={userInfo} lineName = {selectedLine}
                />
            </div>
        )
    }
}

export default PlayLineRoute
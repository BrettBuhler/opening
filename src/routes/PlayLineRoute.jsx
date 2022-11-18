import PlayLine from '../components/PlayLine'
import { useState, useEffect } from 'react'
import SelectLine from '../components/SelectLine'

const PlayLineRoute = ({ width, height, line, side }) => {
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
            <div>
                <SelectLine lines={openingList} setSelectedLine={setSelectedLine}/>
            </div>
        )
    } else {
        return (
            <div>
                <PlayLine
                    width={width} height={height} line={line[selectedLine]} side={side}
                />
            </div>
        )
    }
}

export default PlayLineRoute
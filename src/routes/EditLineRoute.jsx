import { useEffect } from 'react'
import { useState } from 'react'
import EditLine from '../components/EditLine'
import EditOptions from '../components/EditOptions'
import Menu from '../components/Menu'

const EditLineRoute = ({ lines, width, height }) => {
    const [option, setOption] = useState(false)
    const [items, setItems] = useState([])

    const square = width < height ? width : height

    const getItems = () => {
        const itemArray = []
        for (let i in lines.openings){
            itemArray.push(i)
        }
        setItems(itemArray)
    }

    useEffect(()=>{
        getItems()
        setOption(false)
    },[])

  
    if (option === false){
        return (
            <div>
                <Menu items={items} menuName={'Select Line to Edit'} setOption={setOption}/>
            </div>
        )
    }
    return (
        <div>
            <EditOptions line={option} userObject={lines} square={square}/>
        </div>
    )
}

export default EditLineRoute
import { useEffect } from 'react'
import { useState } from 'react'
import EditLine from '../components/EditLine'
import EditOptions from '../components/EditOptions'
import Menu from '../components/Menu'

const EditLineRoute = ({ lines, width, height, userInfo, setUserInfo }) => {
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
                <Menu items={items} menuName={'Select Line to Edit'} setOption={setOption} login={false} userInfo={userInfo}/>
            </div>
        )
    }
    return (
        <div>
            <EditOptions line={option} userObject={lines} square={square} userInfo={userInfo}/>
        </div>
    )
}

export default EditLineRoute
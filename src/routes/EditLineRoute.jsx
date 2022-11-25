import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useState } from 'react'
import EditOptions from '../components/EditOptions'
import Menu from '../components/Menu'

//Renders A menu where the user can select what line they want to edit

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
            <Box>
                <Menu items={items} menuName={'Select Line to Edit'} setOption={setOption} login={false} userInfo={userInfo}/>
            </Box>
        )
    } else {
        return (
            <Box>
                <EditOptions line={option} userObject={lines} square={square} userInfo={userInfo}/>
            </Box>
        )
    }
}

export default EditLineRoute
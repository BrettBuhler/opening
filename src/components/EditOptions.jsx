import Menu from "./Menu"
import { useState, useEffect } from "react"
import userService from '../services/chessList'
import { Navigate } from "react-router-dom"
import EditLineSelector from "./EditLineSelector"

const EditOptions = ({line, userObject, square}) => {
    const [option, setOption] = useState('')

    useEffect(()=>{
        setOption(false)
    },[])


    if (option === false){
        return (
            <Menu items={['Delete', 'Add Side-line', 'Edit Line', 'Help']} menuName={`Edit: ${line}`} setOption={setOption}/>
        )
    }
    switch(option){
        case 'Delete':
            if (window.confirm(`Are you sure you want to delete ${line}?`)){
                delete userObject.openings[line]
                userService.deleteUser(userObject.userName).then(()=>{
                    userService.createUser(userObject)
                })
            }
            return (
                <Navigate to={'/'} />
            )
            break
        case 'Add Side-line':
            return (
                <div>Sideline</div>
            )
            break
        case 'Edit Line':
            return (
                <EditLineSelector line={line} userObject={userObject} square={square}/>
            )
        default:
            return (
                <div>help</div>
            )
    }
}

export default EditOptions
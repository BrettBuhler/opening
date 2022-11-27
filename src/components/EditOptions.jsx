import Menu from "./Menu"
import { useState } from "react"
import userService from '../services/chessList'
import { Navigate } from "react-router-dom"
import EditLineSelector from "./EditLineSelector"

/*
EditOptions renders a menu where the user can select how they want to edit a line.
*/
const EditOptions = ({line, userObject, square, userInfo }) => {
    const [option, setOption] = useState(false)

    if (option === false){
        return (
            <Menu items={['Delete', 'Add Side-line', 'Edit Line', 'Help']} menuName={`Edit: ${line}`} setOption={setOption} login={false} userInfo={userInfo}/>
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
                <Navigate to={'/opening'} />
            )
        case 'Add Side-line':
            return (
                <EditLineSelector line={line} userObject={userObject} square={square} mode={'Add Side-line'} userInfo={userInfo}/>
            )
        case 'Edit Line':
            return (
                <EditLineSelector line={line} userObject={userObject} square={square} mode={'Edit Line'} userInfo={userInfo}/>
            )
        case 'Help':
            return (
                <Navigate to={'/opening/help'} />
            )
        default:
            console.log(option)
            return (
                <Navigate to={'/opening'} />
            )
    }
}

export default EditOptions
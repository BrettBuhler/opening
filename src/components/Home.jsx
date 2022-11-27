import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/system'
import { Navigate } from 'react-router-dom'
import Menu from './Menu'

/*
The Home component renders the main menu. Depending on what option the user selects, the user is then routed to the appropriate page.
*/
const Home = ({ setUser, userInfo, setUserInfo, lines }) => {
    const [option, setOption] = useState(false)

    //Tests for empy object
    const isEmpty = (object) => {
        for (let key in object){
            if (object.hasOwnProperty(key)){
                return false
            }
        }
        return true
    }

    if (!option){
        return (
            //display a menu
            <Box>
                <Menu items={['New Line', 'Edit Line', 'Play Line', 'Endless', 'Help']} menuName={'Main Menu'} setOption={setOption} setUser={setUser} setUserInfo={setUserInfo} login={true} userInfo={userInfo}/>
            </Box>
        )
    } else {
        //Checks to see if user's lines are empty, if so, sends an error and returns option to default (false)
        if (isEmpty(lines.openings)){
            if (option === 'Edit Line' || option === 'Endless' || option === 'Play Line'){
                alert('Opps, you don\'nt have any lines saved. Please add a line.')
                return (
                    <Navigate to='/opening/help' />
                )
            }
        }
        //send user to appropriate route
        switch(option){
            case 'New Line':
                return <Navigate to='/opening/newline'/>
            case 'Edit Line':
                return <Navigate to='/opening/editline'/>
            case 'Play Line':
                return <Navigate to='/opening/playline'/>
            case 'Endless':
                return <Navigate to='/opening/endless'/>
            case 'Help':
                return <Navigate to='/opening/help'/>
            default:
                return <Navigate to='/opening'/>
        }
    }
}

export default Home
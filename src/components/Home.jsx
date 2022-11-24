import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/system'
import { Link, Navigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import Menu from './Menu'
import jwt_decode from 'jwt-decode'
import TopBar from './TopBar'

const Home = ({ setUser, userInfo, setUserInfo }) => {
    const [option, setOption] = useState(false)
    if (!option){
        return (
            <Box>
                <Menu items={['New Line', 'Edit Line', 'Play Line', 'Endless', 'Help']} menuName={'Main Menu'} setOption={setOption} setUser={setUser} setUserInfo={setUserInfo} login={true} userInfo={userInfo}/>
            </Box>
        )
    } else {
        switch(option){
            case 'New Line':
                return <Navigate to='/newline'/>
                break
            case 'Edit Line':
                return <Navigate to='/editline'/>
                break
            case 'Play Line':
                return <Navigate to='/playline'/>
                break
            case 'Endless':
                return <Navigate to='/endless'/>
                break
            case 'Help':
                return <Navigate to='/help'/>
            default:
                return <Navigate to='/'/>
        }
    }
}

export default Home
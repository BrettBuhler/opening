import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/system'
import { Link, Navigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import Menu from './Menu'
import jwt_decode from 'jwt-decode'

const Home = ({ setUser, userInfo, setUserInfo }) => {
    const [option, setOption] = useState(false)
    if (!option){
        return (
            <Box>
                <Menu items={['New Line', 'Edit Line', 'Play Line', 'Endless', 'Help']} menuName={'Main Menu'} setOption={setOption}/>
                <GoogleLogin
                    onSuccess={res => {
                        const authenticatedUserInfo = jwt_decode(res.credential)
                        setUserInfo({
                            name: authenticatedUserInfo.name,
                            email: authenticatedUserInfo.email
                        })
                        setUser(authenticatedUserInfo.email)
                    }}
                    onError={()=> {
                        console.log('Login Failed')
                    }}
                />
                <Box>
                    {userInfo.name}
                </Box>
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
            default:
                return <Navigate to='/'/>
        }
    }
}

export default Home
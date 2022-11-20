import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Menu from './Menu'

const Home = () => {
    const [option, setOption] = useState(false)
    if (!option){
        return (
            <Menu items={['New Line', 'Edit Line', 'Play Line', 'Endless', 'Help']} menuName={'Main Menu'} setOption={setOption}/>
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
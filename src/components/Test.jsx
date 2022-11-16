import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import chessService from '../services/chessList'

/**
 * Test.jsx is used in development to interact with the backend and test async functions
 */

const Test = () => {
    const [userData, setUserData] = useState({})

    const deleteUser = () => {
        chessService.deleteUser('guest')
    }

    const getUser = () => {
        setUserData(chessService.getUser('guest').then(res => {
            setUserData(res)
        }))
        console.log(userData.userName)
    }

    return (
        <div>
            <button onClick={deleteUser}>DELETE</button>
            <button onClick={getUser}>GET</button>
        </div>
    )
}

export default Test
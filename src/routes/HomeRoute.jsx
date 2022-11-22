import React from 'react'
import Home from '../components/Home'

const HomeRoute = ({ setUser, userInfo, setUserInfo }) => {
    return (
        <div>
            <Home
                setUser={setUser}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
            />
        </div>
    )
}

export default HomeRoute
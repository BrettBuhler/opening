import React from 'react'
import Home from '../components/Home'

//Renders the Home page

const HomeRoute = ({ setUser, userInfo, setUserInfo, lines }) => {
    return (
        <div>
            <Home
                setUser={setUser}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                lines={lines}
            />
        </div>
    )
}

export default HomeRoute
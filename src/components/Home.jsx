import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({}) => {
    return (
        <div id='menu'>
            <div id='menu-items'>
                <p>THIS IS HOME</p>
                <Link to='/newline'>NewLine</Link>
                <Link to='/playline'>PlayLine</Link>
                <Link to='/editline'>Edit Line</Link>
            </div>
        </div>
    )
}

export default Home
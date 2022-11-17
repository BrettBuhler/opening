import { NavLink } from 'react-router-dom'

const HomeButton = ({ text }) => {
  
    return (
        <NavLink to='/'>{text}</NavLink>
    )
}

export default HomeButton
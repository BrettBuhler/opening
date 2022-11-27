import { NavLink } from 'react-router-dom'

//return the user home
const HomeButton = ({ text }) => {
  
    return (
        <NavLink to='/opening'>{text}</NavLink>
    )
}

export default HomeButton
import MenuItem from "./MenuItem"
import { Box } from "@mui/system"

const Menu = ({ items, menuName, setOption}) => {
    const onClick = (event) => {
        setOption(event.target.value)
    }
    return (
        <Box>
            <h2>{menuName}</h2>
            {items.map((x,i)=><MenuItem item={x} key={i} onClick={onClick}/>)}
        </Box>
    )
}

export default Menu
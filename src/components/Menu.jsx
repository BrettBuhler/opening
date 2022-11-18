import MenuItem from "./MenuItem"

const Menu = ({ items, menuName, setOption}) => {
    const onClick = (event) => {
        setOption(event.target.value)
    }
    return (
        <div>
            <h2>{menuName}</h2>
            {items.map((x,i)=><MenuItem item={x} key={i} onClick={onClick}/>)}
        </div>
    )
}

export default Menu
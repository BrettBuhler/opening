/*
Returns a customer menu button onHover and offHover control style
*/

const MenuItem = ({item, onClick, onHover, offHover }) => {

    return (
        <button
        className="menuButton"
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={offHover}
        value={item}
        >
            {item}
        </button>
    )
}
export default MenuItem
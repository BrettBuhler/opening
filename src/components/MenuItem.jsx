const MenuItem = ({item, onClick }) => {
    return (
        <div className="menuDiv">
            <button className="menuButton" onClick={onClick} value={item}>{item}</button>
        </div>
    )
}
export default MenuItem
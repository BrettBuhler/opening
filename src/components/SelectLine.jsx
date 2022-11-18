const SelectLine = ({lines, setSelectedLine}) => {

    /**
     * The SelectLine component dispalys a menu where a user can select what line they want to play / eddit
     * This menu is used by the PlayLine component, and the EditLine component
     */
    const handleClick = (event) => {
        setSelectedLine(event.target.value)
    }

    return (
        <div>
            {lines.map((x,i) => <button onClick={handleClick} value={x} key={i}>{x}</button>)}
        </div>
    )
}

export default SelectLine
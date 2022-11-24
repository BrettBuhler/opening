import { Box } from '@mui/system'
import { useState } from 'react'

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
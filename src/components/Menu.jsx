import MenuItem from "./MenuItem"
import { Box } from "@mui/system"
import TopBar from "./TopBar"
import { useState } from "react"

/*
The menu component renders a custom menu with editable menu items, menu name, an optional login button.
the component requries a setOption hook. When a user selects one of the menu items, the parent component's option is updated. (this then
    renders the next component)
*/

const Menu = ({ items, menuName, setOption, login , setUser, setUserInfo, userInfo}) => {
    const [backgroundStyle, setBackgroundStyle] = useState('0')
    const [backgroundSize, setBackgroundSize] = useState('15vmin 15vmin')
    const [pictureStyle, setPictureStyle] = useState('35')
    const [pictureSize, setPictureSize] = useState('110')

    //setOption hook passed to Menu. If option is not false, menu item has been selected and the next component will render.
    const onClick = (event) => {
        setOption(event.target.value)
    }
    /*
    onHover shifts the position and size of a background image and a background pattern when a user moses over a menu item.
    The shifts in position and size of the image and pattern are differnt. This creates a "parallax" effect
    */
    const onHover = () => {
        const pStyle = parseInt(pictureStyle)
        const pSize = parseInt(pictureSize)
        if (pStyle > 60){
            setPictureStyle('35')
        } else {
            setPictureStyle((pStyle + 5).toString())
        }
        if (pSize > 160){
            setPictureSize('110')
        } else {
            setPictureSize((pSize + 10).toString())
        }
        const randomSize = Math.floor(Math.random() * 9) + 12
        setBackgroundSize(`${randomSize}vmin ${randomSize}vmin`)
        switch(backgroundStyle){
            case '0':
                setBackgroundStyle('-25')
                break
            case '-25':
                setBackgroundStyle('-50')
                break
            case '-50':
                setBackgroundStyle('-75')
                break
            case '-75':
                setBackgroundStyle('-100')
                break
            default:
                setBackgroundStyle('0')
                break
        }
    }

    /*
    offHover slightly changes the background patterns size when the user mouses off a menu item
    */
    const offHover = () => {
        const pSize = parseInt(pictureSize)
        const pStyle = parseInt(pictureStyle)
        setPictureSize(`${pSize + 5}`)
        setPictureStyle(`${pStyle + 10}`)
        const nums = backgroundSize.split('').filter(x=>parseInt(x))
        let num1 = nums[0]
        let num2 = nums[1]
        let newNum = num1.toString() + num2.toString()
        newNum = parseInt(newNum)
        setBackgroundSize(`${newNum - 2}vmin ${newNum - 2}vmin`)
        setPictureSize(`${pSize + 5}`)
        setPictureStyle(`${pStyle + 10}`)
    }

    return (
        <Box>
            <TopBar  login={login} userInfo={userInfo} setUser={setUser} setUserInfo={setUserInfo} menuName={menuName}/>
            <Box className={'menuBox'}>
                <Box className={'menuItems'}>
                    {items.map((x,i)=><MenuItem item={x} key={i} onClick={onClick} onHover={onHover} offHover={offHover}/>)}
                </Box>
            </Box>
            {/*Inline styles are required as the backgrounds are not children or siblings of the menuItems
            onHover and offHover controll the background div's styles with the help of the Menu component's state.*/}
            <div id={'menu-background-pattern'} style={{backgroundPosition: `0% ${backgroundStyle}%`, backgroundSize: backgroundSize, transition: 'opacity 800ms ease, background-size 800ms ease, background-position 800ms ease'}}></div>
            <div id={'menu-background-img'} style={{backgroundPosition: `center ${pictureStyle}%`,backgroundSize: `${pictureSize}vmax`, transition: 'opacity 800ms ease, background-size 800ms ease, background-position 800ms ease'}}></div>
        </Box>
    )
}

export default Menu
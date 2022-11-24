import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from 'jwt-decode'

const TopBar = ({ login, userInfo, setUser, setUserInfo, menuName}) => {

    const loginButton = () => {
        if (login) {
            if(userInfo.name == 'guest'){
                return (
                    <Box>
                        <GoogleLogin
                            onSuccess={res => {
                                const authenticatedUserInfo = jwt_decode(res.credential)
                                setUserInfo({
                                    name: authenticatedUserInfo.name,
                                    email: authenticatedUserInfo.email
                                })
                                setUser(authenticatedUserInfo.email)
                            }}
                            onError={()=> {
                                console.log('Login Failed')
                            }}
                            theme={'dark'}
                            className={'googleLogin'}
                        />
                    </Box>
            )} else {
                return (
                    <Box>
                        <Typography className={'topBarText'} fontSize={'20px'}>{userInfo.name}</Typography>
                    </Box>
                )
            }
        } else {
            return (
                <Box>
                    <Typography className={'topBarText'} fontSize={'20px'}>{userInfo.name}</Typography>
                </Box>
            )
        }
    }
    const middleText = () => {
        let width = window.screen.width
        if (width > 600){
            return (
                <Typography className={'topBarText'} id={'middleText'} fontSize={'20px'}>Opening Master</Typography>
            )
        }
    }

    return (
        <Box className={'topBarBox'}>
            <Typography className={'topBarText'} fontSize={'20px'}>{menuName}</Typography>
            {middleText()}
            {loginButton()}
        </Box>
    )
}

export default TopBar
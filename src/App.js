import { useEffect } from 'react'
import { useState } from 'react'
import userService from './services/chessList'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomeRoute from './routes/HomeRoute'
import NewLineRoute from './routes/NewLineRoute'
import PlayLineRoute from './routes/PlayLineRoute'
import EditLineRoute from './routes/EditLineRoute'
import EndlessRoute from './routes/EndlessRoute'

const App = () => {
  //dynamicaly set width and hieght relative to display or window size
  const [width, setWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
  const [height, setHeight] = useState(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
  const [user, setUser] = useState('guest')
  const [userInfo, setUserInfo] = useState({ name: 'guest', email: 'guest'})
  const [lines, setLines] = useState({})
  const [side, setSide] = useState('white')

  //handler function to implement a responsive chessboard
  const resizeHandler = () => {
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    setWidth(w)
    setHeight(h)
  }

  //window resize event listener
  useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])
  
  //get Lines from DB, if user does not exist in DB, set local state to a new user object
  useEffect(()=> {
    userService.getUser(user).then(res => {
      if(res.userName){
        if(res.openings){
          setLines(res)
        } else {
          setLines({
            openings: {},
            userName: res.userName
          })
        }
      }
    })
  }, [user])

  return (
    <GoogleOAuthProvider clientId='720674888113-prj4llvboojk0ldt15dievrdpgfntlvr.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeRoute
            setUser={setUser}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            side={side}
            setSide={setSide}
          />}/>
          <Route path='/newline' element={<NewLineRoute
            user={user}
            lines={lines}
            width={width}
            height={height}
            userInfo={userInfo}
          />}/>
          <Route path='/playline' element={<PlayLineRoute
            width={width}
            height={height}
            line={lines.openings}
            side={side}
            userInfo={userInfo}
          />}/>
          <Route path='/editline' element={<EditLineRoute
            lines={lines}
            width={width}
            height={height}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />}/>
          <Route path ='endless' element ={<EndlessRoute
            lines={lines}
            width={width}
            height={height}
            userInfo={userInfo}
          />}/>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App;

import { useEffect } from 'react'
import { useState } from 'react'
import userService from './services/chessList'
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom'
import HomeRoute from './routes/HomeRoute'
import NewLine from './components/NewLine'
import Test from './components/Test'
import PlayLine from './components/PlayLine'
import NewLineRoute from './routes/NewLineRoute'
import PlayLineRoute from './routes/PlayLineRoute'

const App = () => {
  //dynamicaly set width and hieght relative to display or window size
  const [width, setWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
  const [height, setHeight] = useState(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
  const [user, setUser] = useState('guest')
  const [lines, setLines] = useState({})
  const [side, setSide] = useState('white')
  const [toPlay, setToPlay] = useState('')

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
      setLines(res)
    }).catch(()=>{
      setLines({
        openings: {
        },
        userName: user
      })
    })
  }, [])

  //FOR TESTING
  const logThis = () => {
    console.log(lines.openings)
  }
  //FOR TESTING
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRoute/>}/>
        <Route path='/newline' element={<NewLineRoute
          user={user}
          lines={lines}
          width={width}
          height={height}
        />}/>
        <Route path='/playline' element={<PlayLineRoute
          width={width}
          height={height}
          line={lines.openings}
          side={side}
        />}/>
      </Routes>
    </BrowserRouter>
  )
}



export default App;

import { useEffect } from 'react'
import { useState } from 'react'
import NewLine from './components/NewLine'

const App = () => {
  //dynamicaly set width and hieght relative to display or window size
  const [width, setWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
  const [height, setHeight] = useState(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
  const [user, setUser] = useState('guest')

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

  return (
    <div>
      <NewLine
        user={user}
        width={width}
        height={height}
       />
    </div>
  )
}



export default App;

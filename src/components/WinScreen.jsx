import { Chess } from 'chess.js'
import HomeButton from './HomeButton'

const WinScreen = ({ setChess }) => {
    const handlePlayAgain = () => {
        setChess(new Chess())
    }

    return (
        <div>
            <button onClick={handlePlayAgain}>Play Again</button>
            <HomeButton text='Home'/>
        </div>
    )
}

export default WinScreen
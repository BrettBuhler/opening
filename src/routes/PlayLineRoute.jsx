import PlayLine from '../components/PlayLine'

const PlayLineRoute = ({ width, height, line, side }) => {
    return (
        <div>
            <PlayLine
                width={width} height={height} line={line} side={side}
            />
        </div>
    )
}

export default PlayLineRoute
import NewLine from '../components/NewLine'

export default function NewLineRoute({ user, lines, width, height }) {
    return (
        <div>
            <NewLine
                user={user}
                lines={lines}
                width={width}
                height={height}
            />
        </div>
    )
}
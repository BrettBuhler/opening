import NewLine from '../components/NewLine'

//Renders a NewLine component

export default function NewLineRoute({ user, lines, width, height, userInfo }) {
    return (
            <NewLine
                user={user}
                lines={lines}
                width={width}
                height={height}
                userInfo={userInfo}
            />
    )
}
const PreferenceItem = ({comm, index, move}) => {
    return (
        <div>
            <p>{comm}</p>
            <button onClick={() => move(index, +1)}>Move Up</button>
            <button onClick={() => move(index, -1)}>Move Down</button>
        </div>
    )
}

export default PreferenceItem;
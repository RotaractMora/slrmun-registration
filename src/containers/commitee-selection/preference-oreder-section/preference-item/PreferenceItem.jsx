const PreferenceItem = ({comm, index, move, commList}) => {
    return (
        <div>
            <p>{comm}</p>
            <p>{commList[comm].short_name}</p>
            <button onClick={() => move(index, +1)}>Move Up</button>
            <button onClick={() => move(index, -1)}>Move Down</button>
        </div>
    )
}

export default PreferenceItem;
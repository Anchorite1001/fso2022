const Notification = ({ message }) => {
    let {mode, content} = message;

    if(!content) {
        return null
    }

    return (
        <div className={mode} >
            {content}
        </div>
    )
}

export default Notification
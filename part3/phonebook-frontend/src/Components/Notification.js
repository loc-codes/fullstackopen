const Notification = ( { notification, notificationType }) => {

    const baseStyle = {
        backgroundColor: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        marginBottom: 10
    }
    
    const successStyle = {
        ...baseStyle,
        color: 'green'
    }
    
    const errorStyle = {
        ...baseStyle,
        color: 'red',
    }


    if (notification === null){
        return null
    }
    return (
        <div className='Notification' 
        style={notificationType === 'success' 
                ? successStyle
                :errorStyle}
        >
            <p>{notification}</p>
        </div>
    )
}

export default Notification
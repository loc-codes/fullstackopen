import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification.message) {
      // Automatically clear the notification after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification.visible ? 'block' : 'none'
  }

  return (
      <div style={style}>
        {notification.message}
      </div> 
  )
}
export default Notification
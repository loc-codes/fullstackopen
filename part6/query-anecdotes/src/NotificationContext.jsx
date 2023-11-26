import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `Anecdote created: "${action.payload}"`
    case "VOTE":
      return `You voted for: "${action.payload}"`
    case "ERROR_POST":
      return 'too short, anecdote must have length of 5 or more'
    case "CLEAR_NOTIFICATION":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    useEffect(() => {
      if (notification) {
        const timer = setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
        }, 5000); 
  
        return () => clearTimeout(timer);
      }
    }, [notification]);

    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
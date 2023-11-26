import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {
    const dispatch = useCounterDispatch()
    useCounterValue
    return (
        <button onClick={() => dispatch({ type })}>
            {label}
        </button> 
    )
}

export default Button
import { type } from "@testing-library/user-event/dist/type"
import React, { useState, useEffect, useRef, useReducer } from "react"


function Counter(props) {
    const [state, dispatch] = useReducer(reducer, initialstate)
    const { count, step } = state

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'tick' })
        }, 1000)
        return () => clearInterval(id)
    }, [dispatch])

    //Захват последнего значения стейта (как в классе)

    return (
        <div>
            <h1>{count}</h1>
            <input value={step} onChange={e => {
                dispatch({
                    type: 'step',
                    step: Number(e.target.value)
                })
            }}></input>
        </div>
    )
}

const initialstate = {
    count: 1,
    step: 1
}

function reducer(state, action) {
    const { step, count } = state
    switch (action.type) {
        case 'tick':
            return {
                ...state,
                count: count + step
            }
        case 'step':
            return {
                ...state,
                step: action.step
            }
        default:
            throw new Error()
    }
}









let arr = [1,2,3,4,5]
let bbb = [...arr].reverse()

const LessonHooks = () => {
    return (
        <div>
            {Counter({ name: "Leva" })}
            {arr.map(item => <span>{item} </span>)}
            <div>{bbb.map(item => <span>{item} </span>)}</div>
        </div>
    )
}


export default LessonHooks
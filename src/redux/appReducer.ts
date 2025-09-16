import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// @ts-ignore
import { getAuthUserData } from "./authReducer";



export type InitialStateType = {
    initialized: boolean,
}

export let initialState: InitialStateType = {
    initialized: false
}

export const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        initializedSuccess: (state) => {
            state.initialized = true
        },
    }
})

export const initializeApp = () => async (dispatch:any) => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}

export const { initializedSuccess } = appReducer.actions;
export default appReducer.reducer;













// const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

// export type InitialStateType = {
//     initialized: boolean,
// }

// export let initialState: InitialStateType = {
//     initialized: false
// }

// const appReducer = (state = initialState, action: any): InitialStateType => {//после скобок тип ВОЗВРАЗАЕМОГО значения

//     switch (action.type) {
//         case INITIALIZED_SUCCESS:
//             return {
//                 ...state,
//                 initialized: true,
//             }
//         default:
//             return state;
//     }
// }

// type InitializedSuccessActionType = {
//     type: typeof INITIALIZED_SUCCESS
// }

// export const initializedSuccess = (): InitializedSuccessActionType => {
//     return {
//         type: INITIALIZED_SUCCESS,
//     }
// }


// export const initializeApp = () => async (dispatch) =>{ 

//     let promis = dispatch(getAuthUserData())
//     promis.then(()=>dispatch(initializedSuccess())) 
// }



// export default appReducer;

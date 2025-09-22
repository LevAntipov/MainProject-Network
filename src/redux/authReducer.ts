// @ts-ignore
import { act } from "react";
// @ts-ignore
import { usersAPI, authAPI, securityAPI } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { stopSubmit } from "redux-form";
import { MeReponseType } from "../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const SET_USER_PROFILE_DATA = "auth/SET-USERS-PROFILE-DATA";
const INCORRECT_VALIDATION_USER_DATA = "INCORRECT-VALIDATION-USER-DATA"
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS"




let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    // isFetching: true,
    captchaUrl: null,

    //Testing
    avatar: null,
    validationMessage: false
}

export const getAuthUserData = createAsyncThunk(
    'authreducer/getAuthUserData',
    async function (_, { rejectWithValue, dispatch }) {
        try {
            let meData = await authAPI.me()

            if (meData.resultCode !== 0) {
                throw new Error('some error')
            }
            let getProfileResponse = await usersAPI.getProfile(meData.data.id) 
                dispatch(setUserAvatar(getProfileResponse.data.photos.small))
            
            return meData.data
        }
        catch (error) {
            return rejectWithValue(error)
        }

    }
)

export const login = createAsyncThunk(
    'authreducer/login',
    async function({email, password, captchaValue}:{email:any,password:any,captchaValue:any},{rejectWithValue,dispatch}) {
        try{
            let response = await authAPI.login(email, password, captchaValue)
        if (response.data.resultCode === 0){
            dispatch(incorrectValidationOfUserData(false))
            dispatch(getAuthUserData())
            dispatch(getCaptchaUrlSuccess(null)) //чтобы после logout каптчи не было
        }
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
            dispatch(incorrectValidationOfUserData(response.data.messages))
        }
        else{
            dispatch(incorrectValidationOfUserData(response.data.messages))
            return response.data.resultCode
        }
        }
        catch(error){

        }
        
    }
)

export const getCaptchaUrl = createAsyncThunk(
    'authreducer/getCaptchaUrl',
    async function(_,{rejectWithValue,dispatch}){
        try {
            const response = await securityAPI.getCaptcha()
            dispatch(getCaptchaUrlSuccess(response.data.url))   
        } catch (error) {
            
        }
        return 0
    }
)

export const logout = createAsyncThunk(
    'authreducer/logout',
    async function({},{rejectWithValue,dispatch}) {
        try {
            const response = await authAPI.logout()
            if(response.data.resultCode === 0){
                dispatch(setAuthUserData({userId:null,email: null,login: null,isAuth: false}))
            }
        } catch (error) {
            
        }
    }
)
// export const getCaptchaUrl = () => async (dispatch) => {
//     let response = await securityAPI.getCaptcha()
//     dispatch(getCaptchaUrlSuccess(response.data.url))
// }

// export const logout = () => async (dispatch) => {
//     let response = await authAPI.logout()
//     if (response.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false))
//     }
// }


// export const login = (email, password, captchaValue) => async (dispatch) => {

//     let response = await authAPI.login(email, password, captchaValue)
//     if (response.data.resultCode === 0) {
//         dispatch(incorrectValidationOfUserData(false))
//         dispatch(getAuthUserData())
//         dispatch(getCaptchaUrlSuccess(null)) //чтобы после logout каптчи не было
//     }
//     else {
//         if (response.data.resultCode === 10) {
//             dispatch(getCaptchaUrl())
//         }
//         let messages = response.data.messages
//         dispatch(incorrectValidationOfUserData(messages))
//         return response.data.resultCode
//     }
// }

// export const getAuthUserData = () => async (dispatch) => {
//     let response = await authAPI.me()
//     if (response.data.resultCode === 0) {
//         let login = response.data.data.login;
//         let id = response.data.data.id;
//         let email = response.data.data.email;
//         dispatch(setAuthUserData(id, email, login, true))

//         usersAPI.getProfile(id).then((response) => {
//             dispatch(setUserAvatar(response.data.photos.small))
//         })
//     }

// }


export const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setAuthUserData: (state, action) => {
            // state.isAuth = action.payload.isAuth
            Object.assign(state, action.payload)
        },
        getCaptchaUrlSuccess: (state, action) => {
            state.captchaUrl = action.payload
        },
        setUserAvatar: (state, action) => {
            state.avatar = action.payload
        },
        incorrectValidationOfUserData: (state, action) => {
            state.validationMessage = action.payload[0]
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthUserData.fulfilled, (state, action) => {
                state.userId = action.payload.id
                state.email = action.payload.email
                state.login = action.payload.login
                state.isAuth = true
            })
        // builder
        //     .addCase
    }

})

const { actions, reducer } = authReducer

export const { setAuthUserData, getCaptchaUrlSuccess, setUserAvatar, incorrectValidationOfUserData
} = actions

export default reducer


// const authReducer = (state = initialState, action: any): InitialStateType => {

//     switch (action.type) {
//         case SET_USER_DATA:
//             return {
//                 ...state,
//                 ...action.payload,
//                 isAuth: action.isAuth,
//             }
//         case SET_USER_PROFILE_DATA:
//             return {
//                 ...state,
//                 avatar_TEST: action.avatar_TEST
//             }
//         case INCORRECT_VALIDATION_USER_DATA:
//             return {
//                 ...state,
//                 validationMessage: action.messages[0]
//             }
//         case GET_CAPTCHA_URL_SUCCESS:
//             return {
//                 ...state,
//                 captchaUrl: action.captchaUrl
//             }
//         default:
//             return state;
//     }
// }



// export const setAuthUserData = (userId, email, login, isAuth) => {
//     return {
//         type: SET_USER_DATA,
//         payload: { userId, email, login },
//         isAuth
//     }
// }


// export const getCaptchaUrlSuccess = (captchaUrl) => {
//     return {
//         type: GET_CAPTCHA_URL_SUCCESS,
//         captchaUrl
//     }
// }

// export const setUserAvatar = (avatar_TEST) => {
//     return {
//         type: SET_USER_PROFILE_DATA,
//         avatar_TEST
//     }
// }


// //TESTING
// export const incorrectValidationOfUserData = (messages) => {
//     return {
//         type: INCORRECT_VALIDATION_USER_DATA,
//         messages
//     }
// }
// //TESTING











// type InitialStateType = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     // isFetching: true,
//     captchaUrl: string | null,
//     //Testing
//     avatar_TEST: string | null,
//     validationMessage: string | false
// }

// let initialState: InitialStateType = {
//     userId: null,
//     email: null,
//     login: null,
//     isAuth: false,
//     // isFetching: true,
//     captchaUrl: null,

//     //Testing
//     avatar_TEST: null,
//     validationMessage: false
// }

// type SetAuthUserDataActionPayloadType = {
//     userId:number | null
//     email: string | null
//     login: string | null
// }
// type SetAuthUserDataActionType = {
//     type: typeof SET_USER_DATA
//     payload: SetAuthUserDataActionPayloadType
//     isAuth:boolean
// }


// export const setAuthUserData = (userId: number | null , email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType=> {
//     return {
//         type: SET_USER_DATA,
//         payload: { userId, email, login },
//         isAuth
//     }
// }

// type getCaptchaUrlSuccessActionType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS,
//     captchaUrl: string | null
// }

// export const getCaptchaUrlSuccess = (captchaUrl: string | null): getCaptchaUrlSuccessActionType => {
//     return {
//         type: GET_CAPTCHA_URL_SUCCESS,
//         captchaUrl
//     }
// }


// type setUserAvatarActionType = {
//     type: typeof SET_USER_PROFILE_DATA,
//     avatar_TEST: string | null
// }

// export const setUserAvatar = (avatar_TEST: string): setUserAvatarActionType => {
//     return {
//         type: SET_USER_PROFILE_DATA,
//         avatar_TEST
//     }
// }

// type incorrectValidationOfUserDataActionType = {
//     type: typeof INCORRECT_VALIDATION_USER_DATA,
//     messages: Array<string> | boolean
// }
// //TESTING
// export const incorrectValidationOfUserData = (messages:Array<string> | boolean): incorrectValidationOfUserDataActionType => {
//     return {
//         type: INCORRECT_VALIDATION_USER_DATA,
//         messages
//     }
// }
// //TESTING


// export const getAuthUserData = () => async (dispatch:any) => {
//     let response = await authAPI.me()
//     if (response.data.resultCode === 0) {
//         let login = response.data.data.login;
//         let id = response.data.data.id;
//         let email = response.data.data.email;
//         dispatch(setAuthUserData(id, email, login, true))

//         usersAPI.getProfile(id).then((response:any) => {
//             dispatch(setUserAvatar(response.data.photos.small))
//         })
//     }

// }

// export const login = (email: string, password: string, captchaValue: string) => async (dispatch: any) => {

//     let response = await authAPI.login(email, password, captchaValue)
//     if (response.data.resultCode === 0) {
//         dispatch(incorrectValidationOfUserData(false))
//         dispatch(getAuthUserData())
//         dispatch(getCaptchaUrlSuccess(null)) //чтобы после logout каптчи не было
//     }
//     else {
//         if (response.data.resultCode === 10) {
//             dispatch(getCaptchaUrl())
//         }
//         let messages = response.data.messages
//         dispatch(incorrectValidationOfUserData(messages))
//         return response.data.resultCode
//         // // это было для REDUX-FORM
//         // let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
//         // let action = stopSubmit("login",{_error:message}) //actioncreator из reduxForm, позволяет
//         // dispatch(action)                                          //получить общую ошибку для всей формы
//     }
// }

// export const getCaptchaUrl = () => async (dispatch: any) => {
//     let response = await securityAPI.getCaptcha()
//     dispatch(getCaptchaUrlSuccess(response.data.url))
// }

// export const logout = () => async (dispatch: any) => {
//     let response = await authAPI.logout()
//     if (response.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false))
//     }
// }


// export default authReducer;
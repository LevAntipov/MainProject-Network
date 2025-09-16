// @ts-ignore
import { usersAPI, profileAPI } from '../api/api';
import { PhotosType, PostsDataType, UserprofileType } from '../types/types';
//@ts-ignore
import { getAuthUserData } from './authReducer'
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const DELETE_POST = "DELETE-POST"
const SET_USER_PHOTO = "SET-USER-PHOTO"
const INCORRECT_URL_FORMAT = "INCORRECT-URL-FORMAT"

//redux прогоняет какие-то свои action-ы
// в начале, при инициализации проекта redux возвращает вместо state - undefined ->
// (profileReducer не получается в параметры state) 
// создается начальное значение state, чтобы это обойти 

type ProfilePrivateDataType = {
    birthsday: string
    location: string
    education: string
}


let initialState = {
    profilePrivateData: {
        birthsday: "04.06.2002",
        location: "Moscow",
        education: "Student",
    } as ProfilePrivateDataType,
    postsData: [
        { id: 1, message: 'Привет!', likesCount: 0, },
        { id: 2, message: 'Изучаю пропсы', likesCount: 0, },
    ] as Array<PostsDataType>,
    userProfile: null as UserprofileType | null,
    userStatus: "пусто",
    incorrectUrlFormat: true
}

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action:any): InitialStateType  => {

    switch (action.type) {

        case (ADD_POST): {
            debugger
            return ({
                ...state,
                postsData: [...state.postsData, {
                    id: state.postsData.length + 1,
                    message: action.postText, 
                    likesCount: 0,
                }],
            })

        }
        case (DELETE_POST):
            return ({
                ...state,
                postsData: state.postsData.filter((item) => item !== action.postId)
            })
        case (SET_USER_PROFILE):
            return ({
                ...state,
                userProfile: action.profile
            })
        case (SET_USER_STATUS):
            return ({
                ...state,
                userStatus: action.status
            })
        case (SET_USER_PHOTO):
            return ({
                ...state,
                userProfile: { ...state.userProfile, photos: action.photos } as UserprofileType //ВРЕМЕННОЕ РЕШЕНИЕ
            })
        case (INCORRECT_URL_FORMAT):
            return ({
                ...state,
                incorrectUrlFormat: { ...action.incorrectUrls }
            })
        default:
            return state;
    }

}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    postText:string
} 
export const addPostActionCreator = (postText: string): AddPostActionCreatorType => {
    return {
        type: ADD_POST,
        postText
    }
}
type DeletePostActionCreator = {
    type: typeof DELETE_POST,
    postId:number
}
export const deletePostActionCreator = (postId: number):DeletePostActionCreator => {
    return {
        type: DELETE_POST,
        postId
    }
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: UserprofileType
}
const setUserProfile = (profile:UserprofileType):SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
const setUserStatus = (status: string): SetUserStatusType => {
    return {
        type: SET_USER_STATUS,
        status
    }
}
type SetUserPhotoType = {
    type: typeof SET_USER_PHOTO
    photos:PhotosType
}
const setUserPhoto = (photos:PhotosType): SetUserPhotoType => {
    return {
        type: SET_USER_PHOTO,
        photos
    }
}

//ДОПИСАТЬ TYPESCRIPT
const incorrectUrlFormatCorrect = (incorrectUrls:any):any => {
    return {
        type: INCORRECT_URL_FORMAT,
        incorrectUrls
    }
}

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data))
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    } catch (error) {
        alert("error")
        debugger
        //сюда попадет, если, к примеру, неправильный api-key
    }
}

export const updateUserProfile = (data:UserprofileType) => async (dispatch: any, getState: any) => {
    let response = await profileAPI.updateProfile(data)
    const ownerId = getState().auth.userId

    // let usId = getState
    if (response.data.resultCode === 0) {
        //Это делаю для автоматичекого обновления мини авы в header, нужно подправить
        dispatch(getUserProfile(ownerId))
        dispatch(incorrectUrlFormatCorrect([null]))
        return 1
    }
    else {
        let incorrectUrls = response.data.messages.map((item:string) => {
            let arr = item.split(/[->>)\s]+/) //такое регулярное выражение тк ответ с сервера: "Invalid url format (Contacts->Website)" 
            return arr[arr.length - 2].toLowerCase()
        })
        debugger
        dispatch(incorrectUrlFormatCorrect(incorrectUrls))
    }
}

//Разобраться что сюда приходит, string или file
export const updateUserPhoto = (photo:any) => async (dispatch:any) => {
    let response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
        //Это делаю для автоматичекого обновления мини авы в header, нужно подправить
        dispatch(getAuthUserData())
    }
}

export default profileReducer;
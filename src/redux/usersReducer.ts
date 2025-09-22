// @ts-ignore
import { usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";
// @ts-ignore
import { updateObjectInArray } from "../utils/object-helpers"
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./reduxStore";




let initialState = {
    // users: [] as Array<UserType>,
    ids: [] as Array<number>,
    entities: {} as Record<number, UserType>,
    pageSize: 8,
    totalUsersCount: 20,
    page: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    serverError: {
        userId: null as number | null,
        status: false as boolean | null
    },
    lastPageRequested: null as number | null,
}

type SetFollowingInProgressActionType = {
    isFetching: boolean
    userId: number
}
export const requestUsers = createAsyncThunk(
    'usersReducer/requestUsers',

    async function ({ page, pageSize }: { page: number, pageSize: number }, { rejectWithValue }) {
        try {
            const response = await usersAPI.getUsers(page, pageSize)
            if (response.eror) {
                //если случится ошибка, то catch ее поймает и отправит в requestUsers.rejected
                throw new Error('Server eror!')
            }
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    },
    // {
    //     condition: ({ page }, { getState }) => {
    //         const s = getState() as RootState;
    //         if (s.usersPage.isFetching) return false;             // уже грузим — не дублируем
    //         if (s.usersPage.lastPageRequested === page) return false;  // эту же страницу уже просили
    //         return true;
    //     }
    // }
)
export const followUnfollowFlow = createAsyncThunk(
    'usersReducer/followUnfollowFlow',
    async function ({ user, shouldFollow }: { user: any, shouldFollow: boolean }, { rejectWithValue, dispatch }) {
        let apiMethod = shouldFollow ? usersAPI.follow : usersAPI.unfollow
        try {
            let response = await apiMethod(user.id)

            if (response.data.resultCode === 0) {
                // dispatch(setFollowingInProgress({ userId: user.id, isFetching: false }))
                dispatch(shouldFollow ? addFriend(user.id) : deleteFriend(user.id))

            }
            if (response.data.eror) {
                throw new Error('Something wrong')
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)

export const usersReducer = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        addFriend: (state, usersId: PayloadAction<number>) => {
            const id = usersId.payload
            if (state.entities[id]) {
                state.entities[id] = { ...state.entities[id], followed: true }
            }
            // state.users = updateObjectInArray(state.users, usersId.payload, "id", { followed: true })
        },
        deleteFriend: (state, usersId: PayloadAction<number>) => {
            const id = usersId.payload
            if (state.entities[id]) {
                state.entities[id] = { ...state.entities[id], followed: false }
            }
            //state.users = updateObjectInArray(state.users, usersId.payload, "id", { followed: false })
        },
        // setUsers: (state, users: PayloadAction<Array<UserType>>) => {
        //     state.users = users.payload
        // },
        setCurrentPage: (state, page: PayloadAction<number>) => {
            state.page = page.payload
        },
        setTotalUsersCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        setIsFetching: (state, isFetching: PayloadAction<boolean>) => { // заменить на toggleIsFetching
            state.isFetching = isFetching.payload
        },
        // setFollowingInProgress: (state, action: PayloadAction<SetFollowingInProgressActionType>) => {
        //     state.followingInProgress = action.payload.isFetching
        //         ? [...state.followingInProgress, action.payload.userId]
        //         : state.followingInProgress.filter(id => id !== action.payload.userId)
        // }

    },
    extraReducers: (builder) => {
        builder
            .addCase(requestUsers.fulfilled, (state, action) => {
                state.serverError.status = false
                // state.users = action.payload.items
                state.entities = action.payload.items.reduce((acc: Record<number, UserType>, user: UserType) => {
                    acc[user.id] = user
                    state.ids.push(user.id)
                    return acc
                }, {})
                state.ids = action.payload.items.map((item: UserType) => item.id)
                state.totalUsersCount = action.payload.totalCount
                state.isFetching = false
            })
            .addCase(requestUsers.pending, (state) => {
                if (!state.isFetching) state.isFetching = true;
            })
            .addCase(requestUsers.rejected, (state) => {
                state.serverError.status = true
                state.isFetching = false
            })


        builder
            .addCase(followUnfollowFlow.fulfilled, (state, action) => {
                const { user } = action.meta.arg
                state.serverError = { status: false, userId: null }
                state.followingInProgress = state.followingInProgress.filter((id) => id !== user.id)
            })
            .addCase(followUnfollowFlow.pending, (state, action) => {
                const { user } = action.meta.arg
                state.followingInProgress.push(user.id)
            })
            .addCase(followUnfollowFlow.rejected, (state, action) => {
                const { user } = action.meta.arg
                state.serverError = { userId: user.id, status: true }
                state.followingInProgress = state.followingInProgress.filter((id) => id !== user.id)
            })
    }
})

const { actions, reducer } = usersReducer

export const { addFriend, deleteFriend, setCurrentPage,
    setTotalUsersCount, setIsFetching
} = actions

export default reducer










// const ADD_FRIEND = "ADD-FRIEND";
// const DELETE_FRIEND = "DELETE-FRIEND"
// const SET_USERS = "SET-USERS"
// const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
// const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
// const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
// const FOLLOWINGINPROGRESS = "FOLLOWING-IN-PROGRESS"


// type InitialStateType = typeof initialState
// const usersReducer = (state = initialState, action:any): InitialStateType => {

//     switch (action.type) {
//         case ADD_FRIEND:
//             return (
//                 {
//                     ...state,
//                     users:updateObjectInArray(state.users,action.userId,"id",{followed: true}),
//                 }
//             )
//         case DELETE_FRIEND:
//             return (
//                 {
//                     ...state,
//                     users:updateObjectInArray(state.users,action.userId,"id",{followed: false}),
//                 }
//             )
//         case SET_USERS:
//             return ({
//                 ...state,
//                 users: action.users
//             })
//         case SET_CURRENT_PAGE:
//             return {
//                 ...state,
//                 page: action.page
//             }
//         case SET_TOTAL_USERS_COUNT:
//             return {
//                 ...state,
//                 totalUsersCount: action.count
//             }
//         case TOGGLE_IS_FETCHING:
//             return {
//                 ...state,
//                 isFetching: action.isFetching
//             }
//         case FOLLOWINGINPROGRESS:
//             return {
//                 ...state,
//                 followingInProgress: action.isFetching
//                     ? [...state.followingInProgress, action.userId]
//                     : [state.followingInProgress.filter(id => id !== action.userId)]
//             }
//         default:
//             return state;
//     }

// }

// type AddFriendType={
//     type: typeof ADD_FRIEND
//     userId: number
// }
// export const addFriend = (userId: number): AddFriendType => {
//     return {
//         type: ADD_FRIEND,
//         userId
//     }
// }

// type DeleteFriendType ={
//     type: typeof DELETE_FRIEND
//     userId: number
// }
// export const deleteFriend = (userId: number):DeleteFriendType => {
//     return {
//         type: DELETE_FRIEND,
//         userId
//     }
// }

// type SetUsersType = {
//     type: typeof SET_USERS
//     users: Array<UserType>
// }
// export const setUsers = (users:Array<UserType>): SetUsersType => {
//     return {
//         type: SET_USERS,
//         users
//     }
// }

// type SetCurrentPageType = {
//     type: typeof SET_CURRENT_PAGE
//     page:number
// }
// export const setCurrentPage = (page: number): SetCurrentPageType => {
//     return {
//         type: SET_CURRENT_PAGE,
//         page
//     }
// }

// type SetTotalUserCountType = {
//     type: typeof SET_TOTAL_USERS_COUNT
//     count: number
// }
// export const setTotalUsersCount = (count: number): SetTotalUserCountType => {
//     return {
//         type: SET_TOTAL_USERS_COUNT,
//         count
//     }
// }

// type SetIsFetchingType={
//     type: typeof TOGGLE_IS_FETCHING
//     isFetching: boolean
// }
// export const setIsFetching = (isFetching: boolean): SetIsFetchingType => {
//     return {
//         type: TOGGLE_IS_FETCHING,
//         isFetching
//     }
// }

// type SetFollowingInProgressType = {
//     type: typeof FOLLOWINGINPROGRESS
//     isFetching:boolean
//     userId:number
// }
// export const setFollowingInProgress = (isFetching: boolean, userId: number): SetFollowingInProgressType => {

//     return {
//         type: FOLLOWINGINPROGRESS,
//         isFetching,
//         userId
//     }
// }

// export const foolowUnfollowFlow = async (dispatch: any, user: UserType, apiMethod: any, actionCreator: any) => {
//     dispatch(setFollowingInProgress({ isFetching: true, userId: user.id }))

//     let response = await apiMethod(user.id)
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(user.id))
//     }

//     dispatch(setFollowingInProgress({ isFetching: false, userId: user.id }))
// }

// export const followStatusChange = (user: UserType, bool: boolean) => {
//     if (bool) { //true - когда НАДО подписаться follow
//         return async (dispatch: any) => {

//             foolowUnfollowFlow(dispatch, user, usersAPI.follow.bind(usersAPI), addFriend)
//         }
//     }

//     else {
//         return async (dispatch: any) => {

//             foolowUnfollowFlow(dispatch, user, usersAPI.unfollow.bind(usersAPI), deleteFriend)
//         }
//     }
// }

// export const requestUsers = (page: number, pageSize: number) => {
//     return async (dispatch: any) => {
//         dispatch(setIsFetching(true))
//         try {
//             let response = await usersAPI.getUsers(page, pageSize)

//             dispatch(setUsers(response.items));
//             dispatch(setTotalUsersCount(response.totalCount));
//         } finally {
//             dispatch(setIsFetching(false))
//         }

//     }
// }


// export default usersReducer;






interface User {
    id: number,
    name: string,
    email: string
}

interface Post {
    id: number,
    title: string,
    content: string,
    published: boolean
}

type myOptional<O> = {
    [key in keyof O]?: O[key]
}

function updateEntity<T extends object>(obj: T, update: Partial<T>): T {
    return {
        ...obj,
        ...update
    }
}

const user: User = { id: 1, name: 'Leva', email: 'mirracle048@gmail.com' }
const updatedUser = updateEntity(user, { name: 'Bob' })
console.log(updatedUser)

const post: Post = { id: 1, title: 'news', content: 'qwe', published: true }
const updatedPost = updateEntity(post, { published: false })
console.log(updatedPost)

//updateEntity(user,{age:10}) //error

type Some<T, K extends keyof T> = { [key in K]: T[key] }

type Human = {
    hairColor: string,
    age: number,
    height: number
}

// let Leva:Some<Human,'age'|'hairColor'> = {

// }

//----------------------------------------------//
type o1 = {
    age: number,
    name: string
}

type o2 = {
    age: number,
    weight: number,
    height: number
}

type o3 = Extract<o1, { age: number }>

//----------------------------------------------//

function getByKey<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}









let user1 = {
    name: 'Leva',
    age: 23,
    height: 185
}

function getByKeyobj<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}
function geyKeys<T extends object>(obj: T) {
    return Object.keys(obj) as Array<keyof T>
}

let a = Object.keys(user1)
let a3 = geyKeys(user1)
let a1 = getByKeyobj(user1, "height")

interface Leva {
    hair: string
    heigth: number
    weight: number
}






type hairType1 = Pick<Leva, 'hair'>
// Pick вытаскивает указанные поля
type hairType2 = Omit<Leva, 'heigth' | 'weight'>
// Omit наоборот, вытаскивает все, кроме указанных




type a3 = Extract<'weight' | 'hair' | 'height', 'hair'>
// Extract работает с литералами, вытаскивает указанное
type a2 = Exclude<'weight' | 'hair' | 'height', 'hair'>
// Exclude наоборот, вытаскивает все, кроме указанных
type a1 = Exclude<keyof Leva, 'hair'>
// Так же можно вытащить ключи из объекта, кроме указанных 



function qwe(arg: number): string {
    return ''
}
type MyParametrsReturn<T> = T extends (...args: infer U) => any ? U : never
type MyReturnType<T> = T extends (...args: any) => infer U ? U : never

let array = [1, 2, 3, '123']
type ArrayItemsType<T> = T extends Array<infer U> ? U : never
type asd = ArrayItemsType<typeof array>

type hjk = MyReturnType<typeof qwe>

type funcType = ReturnType<typeof qwe>
// ReturnType - возвращает тип возврата функции 
type argType = Parameters<typeof qwe>
// Parameters возвращает типы аргументов


type Colors = 'red' | 'green' | 'blue'
type Status = 'succesful' | 'rejected' | 'pending'

let colorObj: Record<Colors, Status> = {
    blue: "pending",
    green: "succesful",
    red: 'rejected'
}
let colorObjPartial: Partial<Record<Colors, Status>> = {
    blue: "pending",
}
// Record устанавливает типы для ключей и значений в объектах
// Можно объединить с Partial, чтобы поля были необязательными 



type Person = {
    name: string,
    readonly age: number,
    height: number
}

type Poerson1 = {
    [key in keyof Person]?: Person[key]
}


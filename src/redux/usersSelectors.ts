import { RootState } from "./reduxStore"

// export const getUsers = (state: RootState) => {
//     return state.usersPage.users
// }

export const getPageSize = (state: RootState) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: RootState) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: RootState) => {
    return state.usersPage.page
}

export const getIsFetching = (state: RootState) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: RootState) => {
    return state.usersPage.followingInProgress
}

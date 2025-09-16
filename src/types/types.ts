export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}
export type Contactstype = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null,
    large: string| null
}

export type UserprofileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: Contactstype
    photos: PhotosType
}

export type UserType = {
    id: number
    name: string
    status:string
    photos: PhotosType
    followed: boolean
}
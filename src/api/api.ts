import axios, { AxiosResponse } from "axios"
import { UserprofileType } from "../types/types"

//сущность axios
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": 'b4f445ee-3c6c-4911-a674-b48fef1898bd',
    }
})

export const usersAPI = {

    getUsers(currentPage:number, pageSize:number) {
        return (
            //Возвращает объект response
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        )
    },

    follow(userId:number) {
        return (
            instance.post(`follow/` + userId)
        )
    },

    unfollow(userId:number) {
        return (
            instance.delete(`follow/` + userId)
        )
    },
    getProfile(userId:number) {
        console.warn('Устаревший метод, ProfileAPI')
        return (
            profileAPI.getProfile(userId)
        )
    }
}

export const profileAPI = {

    getProfile(userId:number) {
        return (
            instance.get(`profile/` + userId)
        )
    },

    getStatus(userId:number) {
        return (
            instance.get(`profile/status/` + userId)
        )
    },

    updateStatus(status:string) {
        // отправку json требует документация сервака
        return (
            instance.put(`profile/status/`, { status: status })
        )
    },

    updateProfile(data:UserprofileType) {
        // отправку json требует документация сервака
        return (
            instance.put(`profile/`, {...data})
        )
    },

    updatePhoto(photoFile:any) {
        //Не можем просто так отправить file на сервак, нужно преобразование
        const formData = new FormData();
        formData.append("image", photoFile);
        return (
            instance.put(`profile/photo/`, formData,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
        )
    }
}

export type MeReponseType = {
    data:{id: number, email: string, login: string},
    resultCode: number ,
    messages: Array<string>
}

export const authAPI = {
    me(): Promise<MeReponseType> {
        return (
            instance.get('auth/me').then(res => res.data)
        )
    },
    login(email:string,password:string,captchaValue: null | string = null) {
        return (
            instance.post('auth/login', 
                { email: email, password: password, captcha: captchaValue})
        )
    },
    logout() {
        return (
            instance.delete('auth/login')
        )
    }
}
export const securityAPI = {
    getCaptcha(){
        return (
            instance.get('/security/get-captcha-url')
        )
    }
}


export interface AuthStatus {
    loggedIn: boolean,
    id?: string
}

export interface IUser{
    _id?: string,
    email: string,
    profile_img: string
}
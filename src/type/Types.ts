export interface UserType {
    name:string
    password:string
}

export const UPDATE_ACOUNT_TABLE = 'updateAcountTable';
export const SET_TOKEN = 'SET_TOKEN';

export interface ActionType {
    type: string
    payload?:any
}

export interface LoginResponseType {
    code:number,
    token:string,
    msg?:string,
    user: {
        name:string,
        id:number,
        score:number,
        user_grop:number,
        avatar:string
    }
}
export interface Setting{
    userId : number,
    color : string,
    font : number
}

export interface User{
    id : number,
    name : string,
    setting : Setting
}
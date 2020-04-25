export interface Setting{
    userId : number,
    color : string,
    font : number,
    t2sOn : boolean
}

export interface User{
    id : number,
    name : string,
    setting : Setting
}
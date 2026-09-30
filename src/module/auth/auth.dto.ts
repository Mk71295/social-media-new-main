export interface LoginInput {
    email : string,
    password : string
}

export interface ResetPasswordInput{
    email:string,
    password:string,
    otp:number
}

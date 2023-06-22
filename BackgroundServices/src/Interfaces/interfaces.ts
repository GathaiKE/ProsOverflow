export interface ConfigOpts{
    host:string
    port:number
    secure:boolean
    auth:{
        user:string
        pass:string
    }
}

export interface MessageOpts{
    from:string
    to:string
    subject:string
    html: string
}

export interface User{
    user_id:string
    profile_pic:string
    first_name:string
    second_name:string
    email:string
    email_sent:number
    deactivated:number
    role_id:string
    password:string
}
export interface SigninValues {
    email: string
    password: string
}

export interface SignupValues extends SigninValues {
    firstName: string
    lastName: string
}
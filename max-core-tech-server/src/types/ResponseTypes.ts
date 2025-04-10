import { UserAddress } from "./UserTypes"

export interface RestResponse {
    success: boolean
    message: string
}

export interface SignInResponse extends RestResponse {
    jwt?: string
    refresh?: string
}

export interface UserDataResponse extends RestResponse {
    firstName?: string
    lastName?: string
    email?: string
    addressId?: string
    userAddress?: UserAddress
}

export interface ConfidentialResponse extends RestResponse {
    token?: string
}

export interface PaymentResponse extends RestResponse {
    sessionId?: string
}
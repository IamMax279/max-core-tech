export interface UserAddress {
    userId: string | undefined
    street: string
    apt: string
    unit: string
    phone: string
    zipCode: string
    city: string
}

export interface UserData {
    firstName: string
    lastName: string
    email: string
    userAddress?: UserAddress
}
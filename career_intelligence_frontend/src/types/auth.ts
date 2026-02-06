export type SignupPayload = {
    email: string,
    password: string,
}

export type LoginPayload = {
    email: string,
    password: string,
}

export type LoginResponse = {
    access_token: string,
    token_type: string,
}
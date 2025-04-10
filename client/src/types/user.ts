export interface User {
    id: number;
    name?: string;
    email: string;
    password?: string;
}

export interface UserReq {
    name?: string;
    email: string;
    password: string;
}

export interface UserResp {
    accessToken: string;
    user: User;
}

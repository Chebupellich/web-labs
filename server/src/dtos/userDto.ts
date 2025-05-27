interface UserDto {
    id: number;
    name: string;
    email: string;
}

interface ReqUserDto {
    name?: string;
    email: string;
    password: string;
}

export { UserDto, ReqUserDto };

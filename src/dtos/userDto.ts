interface UserDto {
    id: number;
    name: string;
    email: string;
}

interface UserResponseDto {
    user: UserDto;
    token: string;
}

interface UserRequestDto {
    name: string;
    email: string;
    password: string;
}

export { UserDto, UserResponseDto, UserRequestDto };

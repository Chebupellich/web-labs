import { User } from '@models/user.js';
import { UserDto } from '@dtos/userDto.js';

class UserMapper {
    static toDto(user: User): UserDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}

export default UserMapper;

import UserModel from '@models/userModel';

class UserDto {
    id: number;
    name: string;
    email: string;
    createdAt: Date;

    constructor(model: Partial<UserModel>) {
        this.id = model.id ?? 0;
        this.name = model.name ?? '';
        this.email = model.email ?? '';
        this.createdAt = model.createdAt ?? new Date();
    }
}

export default UserDto;

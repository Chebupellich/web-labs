class UserDto {
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.email = model.email
        this.createdAt = model.createdAt
    }
}

export default UserDto
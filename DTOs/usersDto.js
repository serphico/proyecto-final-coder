
class UsersDto{
    constructor({_id, username, fullName, email, phone, address, avatar}){
        this.id = _id;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.avatar = avatar;
    }
}

function asDto(user) {
    if (Array.isArray(user))
        return user.map(u => new UsersDto(u))
    else
        return new UsersDto(user)
}

module.exports = {asDto, UsersDto}
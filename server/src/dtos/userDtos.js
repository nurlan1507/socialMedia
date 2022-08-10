class userDto{
    firstName;
    secondName;
    email;
    id;
    avatar;
    constructor(id,firstName, secondName,email, avatar) {
        this.id = id
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.avatar = avatar
    }
}

module.exports = userDto;
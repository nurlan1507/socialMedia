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
    };

    toString(){
        return {
           firstname:this.firstName,
            secondName:this.secondName,
            id:this.id,
            avatar:this.avatar
        }
    }
}

module.exports = userDto;
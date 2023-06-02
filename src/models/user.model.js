class User {
    constructor(id, fullname, email, username, password){
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.createdAt = new Date();
    }
}

module.exports = User;
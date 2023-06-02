class Blog {
    constructor(id, title, text, author, userId){
        this.id = id;
        this.title = title;
        this.text = text;
        this.author = author;
        this.userId = userId;
        this.views = {
            users: [],
            count: 0
        };
        this.createdAt = new Date();
    }
}

module.exports = Blog;
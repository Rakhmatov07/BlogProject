const IO = require("../utils/io");
const Model = require("../models/blog.model");
const { v4: uuid } = require('uuid');
const TokenId = require("../utils/tokenID");
const Blogs = new IO("./database/blogs.json");
const Users = new IO("./database/users.json");
const secretKey = "Maestro$$12";
const tokenId = new TokenId(secretKey);

const getAll = async(req, res) => {
    const blogs = await Blogs.read();
    res.status(200).json({message: "Success", blogs});
}

const getOne = async(req, res) => {
    const blogs = await Blogs.read();
    const users = await Users.read();
    const { id } = req.params;
    // Get User's Id from tokenID.js file
    const userId = await tokenId.getId(req);
    const findBlog = blogs.find((blog) => blog.id == id);
    if(findBlog){
        const usersView = findBlog.views.users;
        const findUser = usersView.find((user) => user == userId);
        if(!findUser){
            findBlog.views.users.push(userId);
            findBlog.views.count += 1;
            await Blogs.write(blogs); 
        }

        const userInfo = users.find((user) => user.id == findBlog.userId);
        findBlog.userId = userInfo ? userInfo : findBlog.userId;
        res.status(200).json({message: "Success", findBlog});
    }else{
        res.status(404).json({message: "Not Found"});
    }

}

const add = async(req, res) => {
    const blogs = await Blogs.read();
    const { title, text, author } = req.body;
    const id = uuid();
    const userId = await tokenId.getId(req);
    const newBlog = new Model(id, title, text, author, userId)
    const token = await tokenId.getToken(newBlog.id);
    const data = await blogs.length ? [...blogs, newBlog] : [newBlog];
    await Blogs.write(data);
    res.status(201).json({message: "Created", token});
}

const edit = async(req, res) => {
    const blogs = await Blogs.read();
    const { title, text } = req.body;
    const { id } = req.params;
    const userId = await tokenId.getId(req);
    const findBlog = blogs.find((blog) => blog.userId == userId && blog.id == id);
    if(findBlog){
        findBlog.title = title;
        findBlog.text = text;
    }else{
        res.status(404).json({message: "Not Found"});
    }


    await Blogs.write(blogs);
    res.status(200).json({message: "Successfully edited"});
}

const deleteBlog = async(req, res) => {
    const blogs = await Blogs.read();
    const { id } = req.params;
    const userId = await tokenId.getId(req);
    const findBlog = blogs.find((blog) => blog.id == id && blog.userId == userId);
    if(findBlog){
        const datas = blogs.filter((blog) => findBlog != blog); 
        await Blogs.write(datas);
        res.status(200).json({message: "Deleted!"});
    }else{
        return res.status(404).json({message: "Not Found"});
    }
}

module.exports = {
    getAll,
    getOne,
    add,
    edit,
    deleteBlog
}

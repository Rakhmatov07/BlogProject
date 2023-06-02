const IO = require("../utils/io");
const Model = require("../models/user.model");
const { v4: uuid } = require('uuid');
const TokenId = require("../utils/tokenID");
const Users = new IO("./database/users.json");
const secretKey = "Maestro$$12";
const tokenid = new TokenId(secretKey);

const register = async(req, res) => {
    const users = await Users.read();
    const { fullname, email, username, password } = req.body;
    const findUser = users.find((user) => user.username === username);
    if(findUser){
        return res.status(409).json({message: "User is already registered! Choose another username"})
    }
    const id = uuid();
    const newUser = new Model(id, fullname, email, username, password);
    const token = await tokenid.getToken(newUser.id);
    const data = users.length ? [...users, newUser] : [newUser];

    await Users.write(data);
    res.status(201).json({message: "Created", token});
};

const logIn = async(req, res) => {
    // Read users and request params
    const users = await Users.read();
    const { username, password } = req.body;
    // Check user exists
    const findUser = users.find((user) => user.username == username && user.password === password);
    // If does not exist send error response
    if(!findUser){
        return res.status(404).json({message: "Not Found"});
    }
    // If exists send success response with status 200
    const token = await tokenid.getToken(findUser.id);
    res.status(200).json({message: "Success", token});
};


module.exports = {
    register,
    logIn
};
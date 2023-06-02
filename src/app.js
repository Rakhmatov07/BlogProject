require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/join", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})
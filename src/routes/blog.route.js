const { Router } = require("express");
const { getAll, getOne, add, edit, deleteBlog } = require("../controllers/blog.controller");
const router = Router();

router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.post("/add", add);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deleteBlog);


module.exports = router
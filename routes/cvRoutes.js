const express = require("express");
const router = express.Router();
const  {cvCrud} = require("../controllers/cvController")
const {protect} = require("../middleware/auth");

router.route("/post").post(protect,cvCrud.createOne);
router.route("/getone/:id").get(protect,cvCrud.getOne);
router.route("/getmany").get(protect,cvCrud.getMany);
router.route("/removeone/:id").delete(protect,cvCrud.removeOne);
router.route("/updateone/:id").put(protect,cvCrud.updateOne);

module.exports = router;
const express = require('express');
const router = new express.Router();

// Controller routes
router.post('/contact', require("./controllers/contact"))
router.post('/join', require("./controllers/join"));

router.all("*", (req, res) => res.status(200).send({data: null, message: "Welcome", error: false}))

module.exports = router;
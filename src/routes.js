const express = require('express');
const router = new express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/support', (req, res) => {
    res.render('support');
});

router.get('/interns', (req, res) => {
    res.render('interns');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/join', (req, res) => {
    res.render('join');
});

router.get('/form', (req, res) => {
    res.render('form');
});
// Controller routes
router.post('/contact', require("./controllers/contact"))
router.post('/join', require("./controllers/join"));

router.all("*", (req, res) => res.status(400).send({data: null, message: "Welcome", error: false}))

module.exports = router;
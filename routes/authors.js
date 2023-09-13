const express = require('express')
const Author = require('../models/authors')
const router = express.Router();


router.get('/', async(req, res) => {
    try {
        let searchOptions = {}
        if (req.query.name !== null && req.query.name !== "") {
            searchOptions.name = new RegExp(req.query.name, 'i')
        }
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: searchOptions })
    } catch (err) {
        res.render('authors/index', {
            authors: authors,
            errMessage: err
        })
    }



})
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})
router.post('/', async(req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        res.redirect('authors')
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errMessage: err
        })
    }
})

module.exports = router
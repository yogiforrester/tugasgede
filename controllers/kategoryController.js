const category = require('../models/kategory.js')

module.exports.getAllCategory = (req, res) => {
    category.findAll().then((category) => {
        res.json(category);
    })
}

module.exports.createCategory = (req, res) => {
    category.create({
        name_category: req.body.nama
    }).then((category) => {
        res.json(category);
    })
}

module.exports.updateCategory = (req, res) => {
    category.findOne({
        where: {
            id: req.body.id
        }
    }).then((category) => {
        if (category) {
            category.update({
                name_category: req.body.nama
            }).then((category) => {
                res.json(category)
            })
        }
    })
}

module.exports.deleteCategory = (req, res) => {
    category.destroy({
        where: {
            id: req.body.id
        }
    }).then((category) => {
        res.json(category)
    })
}
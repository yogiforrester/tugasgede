const category = require('../models/Kategory.js')

module.exports.getAllCategory = (req, res) => {
    category.findAll().then((category) => {
        res.json(category);
    })
}

module.exports.createCategory = (req, res) => {
    category.create({
        category_name: req.body.category_name
    }).then((category) => {
        res.json(category);
    })
}

module.exports.updateCategory = (req, res) => {
    category.findOne({
        where: {
            id: req.params.id
        }
    }).then((category) => {
        if (category) {
            category.update({
                category_name: req.body.category_name
            }).then((category) => {
                res.json(category)
            })
        }
    })
}

module.exports.deleteCategory = (req, res) => {
    category.destroy({
        where: {
            id: req.params.id
        }
    }).then((category) => {
        res.json(category)
    })
}
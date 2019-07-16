const catalog = require('../models/katalogku.js')

module.exports.getAllCatalog = (req, res) => {
    catalog.findAll().then((catalog) => {
        res.json(catalog);
    })
}

module.exports.createCatalog = (req, res) => {
    catalog.create({
        name_catalog: req.body.nama
    }).then((catalog) => {
        res.json(catalog);
    })
}

module.exports.updateCatalog = (req, res) => {
    catalog.findOne({
        where: {
            id: req.body.id
        }
    }).then((catalog) => {
        if (catalog) {
            catalog.update({
                name_catalog: req.body.nama
            }).then((catalog) => {
                res.json(catalog)
            })
        }
    })
}

module.exports.deleteCatalog = (req, res) => {
    catalog.destroy({
        where: {
            id: req.body.id
        }
    }).then((catalog) => {
        res.json(catalog)
    })
}
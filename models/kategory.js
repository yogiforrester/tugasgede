const Sequelize = require('sequelize')
const sequelize = require('../config/db_sequelize.js')

class Kategory extends Sequelize.Model {}

Kategory.init({
    name_category: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'category'
})

module.exports = Kategory
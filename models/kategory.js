const Sequelize = require('sequelize')
const sequelize = require('../config/db_sequelize.js')

class kategory extends Sequelize.Model {}

kategory.init({
    category_name: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'category'
})

module.exports = kategory
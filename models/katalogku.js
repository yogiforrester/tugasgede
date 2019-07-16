const Sequelize = require('sequelize')
const sequelize = require('../config/db_sequelize.js')

class Katalogku extends Sequelize.Model {}

Katalogku.init({
    name_catalog: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'catalog'
})

module.exports = Katalogku
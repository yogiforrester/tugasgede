const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./routes/router')
const sequelize = require('./config/db_sequelize.js')
const nunjucks = require('nunjucks')

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.use(
    '/static', express.static(
        path.join(
            __dirname, 'public'
        )
    )
)

app.use(bodyParser.json())

//app.set('view engine', 'ejs')

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(router)

app.listen(3000, () => {
    console.log(`Server aktif di port 3000`)
    sequelize.sync()
    // sequlize.authenticate().then(() => {
    //     console.log('Connection has been established')
    // }).catch(err => {
    //     console.log('Unable to connect to database', err)
    // })
})
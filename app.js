const express = require('express')
const app = express()
const port = 2020
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./routes/router')
const sequelize = require('./config/db_sequelize.js')


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
app.set('view engine', 'ejs')



app.use(router)

app.listen(port, () => {
    console.log(`Server aktif di port 2020`)
     sequelize.sync()
   
})
// Imports
const express = require('express')
const app = express()
require('dotenv').config()
require('./config/database')


// ===== MIDDLEWARE =====
app.use(express.json())
app.use(require('./config/checkToken'))

// ===== ROUTES =====
//users
app.use('/api/v1/users', require('./routes/api/users.js'))

const ensureLoggedin = require('./config/ensureloggedin')

// Movies
app.use('/api/v1/movies', ensureLoggedin, require('./routes/api/movies.js'))


// ===== PORT =====
const port = 8080

app.listen(port, () => console.log(`Express app running on port ${port}`))
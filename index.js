// required packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models')
const axios = require('axios')
const crypto = require('crypto-js')
const router = express.Router()

// app config
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')
// parse request bodies from html forms
app.use(express.urlencoded({ extended: false }))
// tell express to parse incoming cookies
app.use(cookieParser())

// custom auth middleware that checks the cookies for a user id
// and it finds one, look up the user in the db
// tell all downstream routes about this user
app.use(async (req, res, next) => {
    try {
        if (req.cookies.userId) {
            //decrypt the user id and turn it into a string
            const decryptedId = crypto.AES.decrypt(req.cookies.userId, process.env.SECRET)
            const decryptedString = decryptedId.toString(crypto.enc.Utf8)
            // the user is logged in, lets find them in the db
            const user = await db.user.findByPk(decryptedString)
            // mount the logged in user on the res.locals
            res.locals.user = user
        } else {
            // set the logged in user to be null for conditional rendering
            res.locals.user = null
        }

        // move on the the next middleware/route
        next()
    } catch (err) {
        console.log('error in auth middleware: 🔥🔥🔥🔥', err)
        // explicitly set the user to null if there's an error
        res.locals.user = null
        next() // go to the next thing
    }
})

// example custom middleware (incoming request logger)
app.use((req, res, next) => {
    // our code goes here
    // console.log('hello from inside of the middleware!')
    console.log(`incoming request: ${req.method} - ${req.url}`)
    // res.locals are a place that we can put data to share with 'downstream routes'
    // res.locals.myData = 'hello I am data'
    // invoke next to tell express to go to the next route or middle
    next()
})

// routes and controllers
// app.get('/', (req, res) => {
//     console.log(res.locals.user)
//     res.render('home.ejs', {
//         user: res.locals.user
//     })
// })
// GET Definition on to home page from search bar on NAV
app.get('/', async(req,res) => {
    try {
        let name = req.query.search
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`
        console.log(url);
        const response = await axios.get(url);
        // const data = { definitions, definition }
        // console.log(definition);
        res.render('home.ejs', {
            user: res.locals.user,
            results: response.data,
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('api error')
    }
})
// // POST /users/:id/favorites - receive the name of a drink and add it to the database
// app.post('/users/favorites', async (req, res) => {
//     // TODO: Get form data and add a new record to DB
//     try {
//       // create a new fave in the db
//       await db.favorite.findOrCreate({
//         where: {
//           word: req.body.word,
//           definition: req.body.definition
          
//         }
//       })
//       // redirect to /faves to show the user their faves
//     } catch (err) {
//       console.log(err)
//     } 
//     res.redirect('/favorites')
// })
app.use('/users', require('./controllers/users'))

// listen on a port
app.listen(PORT, () => {
    console.log(`authenticating users on PORT ${PORT} 🔐`)
})
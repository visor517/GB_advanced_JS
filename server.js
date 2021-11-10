import express from 'express'
import fs from 'fs'


const app = express()
const SERVER_PORT = 3000

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}!`)
})

app.use(express.static('./public/'))

app.get('/api/catalog', (req, res) => {
    fs.readFile('db/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    })
})
app.get('/api/basket', (req, res) => {
    fs.readFile('db/basket', 'utf8', (err, data) => {
        res.send(data);
    })
})

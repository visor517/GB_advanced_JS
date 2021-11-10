import express from 'express'
import fs from 'fs'


const app = express()
const SERVER_PORT = 3000

app.use(express.static('./public/'))
app.use(express.json())

app.get('/api/catalog', (req, res) => {
    fs.readFile('db/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    })
})
app.get('/api/basket', (req, res) => {
    fs.readFile('db/basket.json', 'utf8', (err, data) => {
        res.send(data);
    })
})
app.post('/api/addToBasket', (req, res) => {
    fs.readFile('db/basket.json', 'utf8', (err, data) => {
        const basket = JSON.parse(data)
        const item = req.body
        basket.push(item)
        fs.writeFile('db/basket.json', JSON.stringify(basket), err => {
            if (err) {
                res.status(500)
            } else {
                res.status(201)
            }
        })
    })
})

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}!`)
})

import express from 'express'
import fs from 'fs'


const app = express()
const SERVER_PORT = 3000

app.use(express.static('./dist/'))
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

        // не добавляем товар второй раз
        if (basket.filter(elem => elem.product_name === item.product_name).length > 0 ) {
            res.status(500).end()
        }
        else {
            basket.push(item)
            fs.writeFile('db/basket.json', JSON.stringify(basket), err => {
                if (err) {
                    res.status(500).end()
                } else {
                    res.status(200).end()
                }
            })
        }
    })
})
app.post('/api/removeFromBasket', (req, res) => {
    fs.readFile('db/basket.json', 'utf8', (err, data) => {
        let basket = JSON.parse(data)
        const item = req.body
        basket = basket.filter(elem => elem.product_name !== item.product_name)
        fs.writeFile('db/basket.json', JSON.stringify(basket), err => {
            if (err) {
                res.status(500).end()
            } else {
                res.status(200).end()
            }
        })
    })
})

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}!`)
})

import express from 'express'


const app = express()
const SERVER_PORT = 3000


app.listen(SERVER_PORT, () => {
    console.log(`server is running on port ${SERVER_PORT}!`)
})

app.use(express.static('./public/'))

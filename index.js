const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/')
    .then((response) => response.json())
    .then((data) => data.forEach(element => {
        element.title
    })).then((title) => res.send(title))
})

app.listen(port, () => {
    console.log(`Example app listning on port ${port}`)
})

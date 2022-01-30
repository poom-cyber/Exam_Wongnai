// Call package
const express = require('express')
const app =  express()
const routes = require('./routes')
// Define port
const PORT = 8000


app.use(express.json())
// Route manage
app.use('/', routes)

// Listen to port
app.listen(PORT, () => {
    console.log("Gateway has started on port" + PORT)
})
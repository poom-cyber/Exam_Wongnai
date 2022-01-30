const express = require('express')
const router = express.Router()
const axios = require('axios')
const { response } = require('express')

router.all("/:apiName", (req, res) => {

    // Fix เว็บ client ที่พยายามจะเรียกเว็บ server ที่มันข้าม domain
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 

    // Call api json server and combine keyword
    const APIJSON = 'http://localhost:9000/' + req.params.apiName+"?q="+req.query.keyword

    // Encode for thai language
    const url = encodeURI(APIJSON)

    // Axios get data from api and send to gate way
    axios.get(url).then((response) => {
        res.send(response.data)
    })
})


module.exports = router

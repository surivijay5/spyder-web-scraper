const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const PORT = 8000

const app = express()
const url = 'https://stackoverflow.com/jobs'
const result = []

axios(url).then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    $('.-job.js-result', html).each(function(){
        const header = $(this)
        const jobURL = header.find('.fs-body3 > a').attr('href')
        const tags = header.find('.gs4 > a').toArray().map(element => $(element).attr('href'));
        if(tags.some(p => p.includes('javascript'))){
            result.push({
                url : jobURL,
                tags : tags
            })
        }
    })
    console.log(result)
})

app.listen(PORT, () => console.log(`server running at port ${PORT}`))
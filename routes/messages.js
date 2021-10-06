var express = require('express');
var router = express.Router();
const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: 'secret_cs4ID7kDERrdfp4gQDRsQUKBMb34CZB2CI66BNo1Xzq'
})

async function getPage() {
    const myPage = await notion.databases.query({
        database_id: "e63a3c01887c49cd97e5d4b163a6947f",
        // filter: {
        //     property: "MessageDB",
        // },
    })
    return myPage;
}


router.get('/', function(req, res, next) {
    getPage().then(response=>response.results.map(item => ({name: item.properties.Name.title[0].text.content, text: item.properties.message.rich_text[0].text.content}))).then(
       data => res.send(data)
    );

});

module.exports = router;


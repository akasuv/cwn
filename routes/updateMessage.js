var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_cs4ID7kDERrdfp4gQDRsQUKBMb34CZB2CI66BNo1Xzq",
});

router.post("/", bodyParser.json(), (req, res) => {
  console.log("request body", req.body);
  notion.pages
    .create({
      parent: { database_id: "e63a3c01887c49cd97e5d4b163a6947f" },
      properties: {
        title: {
          title: [
            {
              text: {
                content: req.body.name,
              },
            },
          ],
        },
        message: {
          rich_text: [
            {
              text: {
                content: req.body.message,
              },
            },
          ],
        },
      },
    })
    .then(() => res.send({ res: "success" }))
    .catch(() => res.send({ res: "error" }));
});

module.exports = router;

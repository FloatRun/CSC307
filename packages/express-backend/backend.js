import express from 'express'; // ES module (async), uses CommonJS by default (sync)
// CommonJS would be more like require('express');

const app = express();
const port = 8000;

app.use(express.json()); // set up express to parse incoming data in JSON

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
})
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, './build')));

app.get("/", (req, res) => {
    res.sendFile(path.join('/index.html'));
})


app.listen(5041, ()=>{
    console.log(`server running on port 5041`);
});
const express = require('express');
const route = require('./routes')

const app = express();

app.listen(3333, () => console.log(`Server Runing on http://localhost:${3333}`));

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))
app.set("views", "./src/views")

app.use(route)

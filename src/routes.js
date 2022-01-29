const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

route.get("/", (req, res) => {
    return res.render('index', { page: "enter-room" })
})
route.get("/create", (req, res) => {
    return res.render('index', { page: "create-pass" })
})
route.get("/room/:roomId", RoomController.open)
route.post("/room-create", RoomController.create)
route.post("/enterroom", RoomController.enter)

route.post("/question/create/:roomId", QuestionController.create)
route.post("/room/:room/:question/:action", QuestionController.index)

module.exports = route
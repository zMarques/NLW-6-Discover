const Database = require('../database/config')

module.exports = {

    async index(req, res) {
        const { room, question, action } = req.params
        const { password } = req.body

        const db = await Database()

        const verirfyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${room}`)

        if (verirfyRoom.pass == password) {

            if (action == "delete") {

                await db.run(`DELETE FROM questions WHERE id = ${question}`)

            } else if (action == "check") {

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${question}`)

            }
            res.redirect(`/room/${room}`)
        }else{
            res.render('passincorrect', {roomId: room})
        }





    },

    async create(req, res) {
        const { question } = req.body
        const { roomId } = req.params

        const db = await Database()

        await db.run(`
        INSERT INTO questions(
            title,
            room,
            read
        ) VALUES (
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/room/${roomId}`)
    }
}
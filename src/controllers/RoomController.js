const req = require("express/lib/request")
const Database = require("../database/config")

module.exports = {
    async create(req, res) {
        const db = await Database()
        const { password } = req.body
        let roomId = ""

        let isRoom = true

        while (isRoom) {

            for (let i = 0; i < 6; i++) {
                roomId += Math.floor(Math.random() * 10).toString()
            }

            const roomsExistIds = await db.all(`SELECT id FROM rooms`)

            isRoom = roomsExistIds.some(roomExistIds => roomExistIds === roomId)
        }

        if (!isRoom) {

            await db.run(`
            INSERT INTO rooms (
                id,
                pass
            ) VALUES (
                ${parseInt(roomId)},
                ${password}
            )
        `)

        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    enter(req, res) {
        const { roomId } = req.body

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const { roomId } = req.params

        const db = await Database()

        const questions = await db.all(`
        SELECT * FROM questions WHERE room = ${roomId} and read = 0`)

        const questionsRead = await db.all(`
        SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

        res.render("room", { roomId, questions, questionsRead })
    }
}
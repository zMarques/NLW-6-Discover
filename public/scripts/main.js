import Modal from './modal.js';

const modal = Modal()

const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalbuttons = document.querySelector(".modal button")


const checkButton = document.querySelectorAll(".action a.check")
checkButton.forEach(button => {
    button.addEventListener("click", handleClick)
})

const deleteButton = document.querySelectorAll(".action a.delete")
deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true) {

    event.preventDefault()

    const slug = check ? "check" : "delete"
    const questionId = event.target.dataset.id
    const roomId = document.querySelector("#room-id").dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/room/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = check ? "Marcar como lido" : "Excluir essa pergunta"
    modalDescription.innerHTML = check ? "Tem certeza que deseja marcar como lida ?" : "Tem certeza que deseja excluir essa pergunta ?"
    modalbuttons.innerHTML = check ? "Marcar como lido" : "Excluir"

    check? modalbuttons.classList.remove("red") : modalbuttons.classList.add("red")

    modal.open()
}
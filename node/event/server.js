const { stdin } = require('process')
const readline = require('readline')

const readline1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})



const EmitNotification = require("events")

const press1 = require("./press1.js")
const press2 = require("./press2.js")
const press3 = require("./press3.js")

const BooksEvent = new EmitNotification;

function checkEvent() {

    const books = ["Half girlfriend","science fiction"]
    BooksEvent.on("press 1", press1)
    BooksEvent.on("press 2", press2)
    BooksEvent.on("press 3", press3)
    readline1.question("press 1 to see all books or press 2 to update the store or press 3 to quit \n", (btn) => {
        if (btn == "1") {
            BooksEvent.emit("press 1", books)
            readline1.close()

        } else if (btn == "2") {
            readline1.question("enter book name \n", (newBookname) => {
                BooksEvent.emit("press 2", { books: books, newBook: newBookname});
                readline1.close()

            })

        } else if (btn == "3") {
            readline1.question("press y to quit  else n to go home page \n", (par) => {
                if (par == "y") {
                    BooksEvent.emit("press 3")
                    readline1.close()
                } else if (par == "n") {
                    checkEvent()
                }

            })

        }

    })


}
checkEvent()


readline1.on("close", () => {
    console.log("see you later")
})
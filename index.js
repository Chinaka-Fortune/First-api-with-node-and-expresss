// Import express.js
import express, { request, response } from "express";
// Import body-parser (to handle parameters more easily)
import bodyParser from "body-parser";

// This variable defines the port of your computer where the API will be available
const PORT = 3000

// This variable instantiates the Express.js library
const app = express()

// Indicate to Express.js that you're using an additional plugin to treat parameters
app.use(bodyParser.urlencoded({ extended: true }))

// The code below starts the API withthese parameters:
// 1 - The PORT where your API will be available
// 2 - The callback function (function to call) when your API is ready
app.listen(PORT, () =>
    console.log(`The Book API is running on: http://localhost:${PORT}.`)
)

// Static variable containing books
let bookList = [
    'make Time: How to Focus on what Matters Every Day',
    'The Power Of Habit'
]

// The code below creates a GET route wuth these parameters:
// 1 - The route where the code will be executed
// 2 - The function containing the code to be executed
app.get('/', (request, response) => {
    //The string we want to display on http://localhost:3000
    response.send('Welcome on the books API! Take a breath and start using it!')
})

// Create the books route
app.get('/books', (request, response) => {
    //The function will return bookList in a JSON
    // Sample : { allBooks: ["make Time: How to Focus on what Matters Every Day", "The Power Of Habit"]}
    return response.json({ allBooks: bookList })
})

// Create a route to add book
// Reminder: POST in the API world is used to ADD a data
app.post('/books', (request, response) => {
    // TODO: Fill the function


    // For now
    // return response({ success: false })

    // We get the parameter 'name' from the body
    const bookName = request.body.name

    // We check if the book list includes the new book
    // If it is, we return 'false'
    if (bookList.includes(bookName)) return response.json({ success: false })

    // Otherwise, we add in the list and return 'true'
    bookList.push(bookName)
    return response.json({ success: true })

})

// Add a delete route
app.delete('/books', (request, response) => {
    // We get the parameter 'name' from the body
    const bookToDelete = request.body.name

    // We create a new array with all elements different from the book to delete
    bookList = bookList.filter((book) => book !== bookToDelete)

    // We return the new list
    return response.json({ allBooks: bookList })
})

// Create a route to update a book
app.put('/books', (request, response) => {
    // We get the parameters 'nameToUpdate' and 'updatedName' from the body
    const bookToUpdate = request.body.nameToUpdate
    const updatedBook = request.body.updatedName

    // We search if the book to update is in the list
    const indexOfBookToUpdate = bookList.findIndex(
        (book) => book === bookToUpdate
    )

    // If it is not a book from the list, we return 'false'
    if (indexOfBookToUpdate === -1) return response.json({ success: false })

    // Otherwise , we replace the name and return 'true'
    bookList[indexOfBookToUpdate] = updatedBook
    return response.json({ success: true })
})
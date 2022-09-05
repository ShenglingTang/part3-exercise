const { response, request } = require('express')
const express = require('express')
const time = require('express-timestamp')
const app = express()
app.use(time.init)

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

  app.get('/api/persons', (request, response) => {
    response.json(notes)
  })

  app.get('/info', (request, response) => {
    const entries = notes.length
    
    response.send(`<div>
    <p>Phonebook has info for ${entries} people.</p>
    <p>${request.timestamp}</p>
    </div>`)
    
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

  
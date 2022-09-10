const { response, request } = require('express')
const express = require('express')
const time = require('express-timestamp')
const app = express()
app.use(time.init)

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    const entries = persons.length

    response.send(`<div>
    <p>Phonebook has info for ${entries} people.</p>
    <p>${request.timestamp}</p>
    </div>`)
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    if (!person) {
      response.status(404).end()
    }
    response.json(person)
  })
  

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(entry => entry.id !== id)
    response.status(204)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

  
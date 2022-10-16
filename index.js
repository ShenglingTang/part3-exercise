require('dotenv').config()
const { response, request } = require('express')
const express = require('express')
const time = require('express-timestamp')
// const morgan = require('morgan')
const app = express()
const cors = require('cors')
// const url = `mongodb+srv://ShenglingTang:Jonttg12@cluster0.pmgviih.mongodb.net/?retryWrites=true&w=majority`
const Phonebook = require('./models/phonebook')
const url = process.env.MONGODB_URL

app.use(time.init)
app.use(express.json()) //use express json-parsar to access the data easily
// app.use(morgan)
app.use(cors())
app.use(express.static('build'))


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
    Phonebook.find({}).then(items => {
      response.json(items)
    })
  })

  app.get('/info', (request, response) => {
    Phonebook.find({}).then(items => {
      console.log(items.length);
      const entries = items.length
      response.send(`<div>
      <p>Phonebook has info for ${entries} people.</p>
      <p>${request.timestamp}</p>
      </div>`)
    })
  })

  app.get('/api/persons/:id', (request, response) => {
    Phonebook.findById(request.params.id)
    .then(phonebookItem => {
      if(phonebookItem) {
        response.json(phonebookItem)
      } else {
        response.status(404).end()
      }
  })
  .catch(error => {
    console.log(error);
    response.status(500).end()
  })
  })

  app.delete('/api/persons/:id', (request, response) => {
    Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
  })

  app.post('/api/persons', (request,response) => {
    const id = Math.floor(Math.random()*10000)

    const body = request.body

    if(!body.name || !body.number) {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    // if(persons.find(person => person.name === body.name)) {
    //   return response.status(409).json({
    //     error: 'name must be unique'
    //   })
    // }

    const phonebookItem = new Phonebook(
      {
        "id": id,
        "name": body.name,
        "number": body.number
      }
    )

    phonebookItem.save().then(savedPhonebookItem => {
      response.json(savedPhonebookItem)
    })
  })

  app.put('/api/persons/:id', (request, response) => {
    const phonebookItem = {
      name: request.body.name,
      number: request.body.number
    }

    Phonebook.findByIdAndUpdate(request.params.id, phonebookItem,{new: true})
    .then(updatedPhonebookItem => {
      response.json(updatedPhonebookItem)
    })
    .catch( error => {
      console.log(error)
      response.status(500).end()
    }
    )
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

  
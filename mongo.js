const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  const url = `mongodb+srv://ShenglingTang:${password}@cluster0.pmgviih.mongodb.net/?retryWrites=true&w=majority`
  
  const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    
  })
  
  const Phonebook = mongoose.model('Phonebook', phonebookSchema)
  
  if(process.argv.length > 3) {
    mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')

      const phonebookItem = new Phonebook({
        name: process.argv[3],
        number: process.argv[4],
      })
  
      return phonebookItem.save()
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
  }

  if (process.argv.length === 3) {
    mongoose.connect(url)
    .then((result) => {
        console.log('connected')

        Phonebook.find({}).then(result => {
            result.forEach(item => {
              console.log(item)
            })
            mongoose.connection.close()
          })
    })
  }
  
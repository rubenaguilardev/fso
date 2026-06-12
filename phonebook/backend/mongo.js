import mongoose from 'mongoose'

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(result => {
    console.log(`Added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}



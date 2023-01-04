require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

console.log('connecting to ', url)

//connect to mongoDB
mongoose
    .connect(url)
    .then(res => {
        console.log('connected to MongoDB')
    })
    .catch(err => console.log(err))

//map out mongoDB collection
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//create model
module.exports = mongoose.model("Person", personSchema)
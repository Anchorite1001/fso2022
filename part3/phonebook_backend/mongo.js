const mongoose = require('mongoose')

// command line format: node mongo.js password name number

// get password from command line
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
} 
const password = process.argv[2]

// map out mongoDB collection
const url = `mongodb+srv://anchorite1001:${password}@helsinki-0.fxkyfho.mongodb.net/?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model("Person", personSchema);

//operations
//create and save new person when info is provided
if (process.argv.length === 5) {
    mongoose
    .connect(url)
    .then(res => {
        console.log('connected to mongoDB')

        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        return person.save()
    })
    .then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        return mongoose.connection.close()
    })
    .catch(err => console.log(err))
}
// get person list when there's no attached info
else if (process.argv.length === 3) {
    mongoose
    .connect(url)
    .then(res => {
        console.log('connected to mongoDB')

        return Person.find({})
    })
    .then(res => {
        res.forEach(person => {
            console.log(person)
        })
        return mongoose.connection.close()
    })
    .catch(err => console.log(err))
}




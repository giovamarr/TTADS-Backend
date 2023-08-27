import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URI

mongoose.connect(MONGO_URL)

const db =  mongoose.connection

db.once('open', () => {
    console.log('Mongo connected')
})

db.once('error', err => {
    console.log(err)
})


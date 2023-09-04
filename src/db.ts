import mongoose from 'mongoose'
import dotenv from "dotenv-flow"

dotenv.config();


mongoose.connect(`${process.env.MONGO_URI}`)

const db =  mongoose.connection

db.once('open', () => {
    console.log('Mongo connected')
})

db.once('error', err => {
    console.log(err)
})


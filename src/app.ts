import express from 'express'
import cors from 'cors';
import './db.js'

import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'

const app = express()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})

app.use(authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
import express from 'express'
import cors from 'cors';
import './db.js'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import saleRoutes from './routes/sale.js'
import userRoutes from './routes/user.js'
import { validateJwt } from './middlewares/session.js';
import dotenv from "dotenv-flow"

const app = express()
dotenv.config();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use(authRoutes);
app.use("/category", validateJwt, categoryRoutes);
app.use("/product", validateJwt, productRoutes);
app.use("/sale", validateJwt, saleRoutes);
app.use("/admin/user", validateJwt, userRoutes);

// Para cuando se ingresa un endpoint inexistente
app.use((_, res) =>{
    return res.status(404).send({ message: 'Recurso no encontrado'})
})
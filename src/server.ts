import express from 'express'
import * as dotenv from 'dotenv'

import routes from './../src/routes'
import { connectDB } from './config/db'

const app = express()

dotenv.config()
connectDB()

app.use(express.json()) // Para que express entienda los JSON
app.use('/api', routes)

export default app

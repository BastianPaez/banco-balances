import express from 'express';
import bancoRoute from './routes/banco.route.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/', bancoRoute)


const PORT = process.env.PORT || 3000
app.listen( PORT, ()=> console.log(`http://localhost:${PORT}/`))
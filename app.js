const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const users = require('./routes/user');
const database = require('./database/db')
const app = express();

database;
// middlewares
app.use(express.json({
    type: "*/*"
}));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('tiny'))

// routes
app.get('/', (req, res) => {
    res.send('Servidor lenvado')
})
app.use('/clientes', users)

//static
app.use(express.static ('dist'))

const port =  8080;
app.listen(port , () => console.log(`Server running at: http://localhost:${port}`))
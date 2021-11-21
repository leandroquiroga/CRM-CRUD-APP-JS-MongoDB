const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const users = require('./routes/user');
const database = require('./database/db')
const app = express();

database;
app.use(express.json({
    type: "*/*"
}));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('tiny'))


app.get('/', (req, res) => {
    res.send('Servidor lenvado')
})
app.use('/clientes', users)

const port =  8080;
app.listen(port , () => console.log(`Server running at: http://localhost:${port}`))
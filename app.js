const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const users = require('./routes/user')

// conecting with mongoBD
mongoose.connect('mongodb://127.0.0.1:27017/crm')
    .then(() => console.log('Conecting with mongoDB'))
    .catch(err => console.log(`Error: ${err}`));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Servidor lenvado')
})

app.use('/clientes', users)
const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening in port: ${port}`))
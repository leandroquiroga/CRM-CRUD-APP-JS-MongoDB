const express = require('express');
const Joi = require('joi');
const Users = require('./../models/users')
const router = express.Router();

// Crea las validaciones para el formulario
const schema = Joi.object({
    name    : Joi.string().min(4).max(50),
    email   : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    company : Joi.string().min(5).max(35),
    phone   : Joi.number().min(8)
})

// Creamos el nuevo usurario y lo guardamos en la base de dato
const createUser = async (body) => {
    console.log('Guardando...')
    let user = new Users({
        name    : body.name,
        email   : body.email,
        company : body.company,
        phone   : body.phone
    })

    return await user.save()
} 

// Mediante el email elimina los usuarios
const deleteUser = async (email) => {
    let result = await Users.findOneAndDelete({"email" : email})
    return result
}

// Modifica los datos del usario 
const updateUser = async (email, body) => {
    let user = await Users.findOneAndUpdate({ "email": email }, {
        $set: {
            email   : body.email,
            company : body.company,
            phone   : body.phone,
        }
    }, { new: true });

    return user;

}
// GET
router.get('/', (req, res) => {
    res.send('Clientes')
});

// POST
router.post('/', (req, res) => {
    let body = req.body;

    let {value,  error } = schema.validate({
        name    : body.name,
        email   : body.email,
        company : body.company,
        phone   : body.phone
    });

    console.log(body)
    if (!error) {
        let data = createUser(body);
        
        data.then( (data) => {
            console.log('Se envio la base de datos')
            res.send(data)
        }).catch(err => {
            res.status(400).json({
                error: err
            })
        })
        
        return
    }

    res.status(400).send(error.message)
});

// PUT
router.put('/:email', (req, res) => {
    let body = req.body;
    let email = req.params.email;
    let user = updateUser(email, body);


    const { value, error } = schema.validate({
        email   : body.email,
        company : body.company,
        phone   : body.phone
    })

    if (!error) {
        user.then(() => {
            res.send("Datos modificados sactifactoriamente !");
        }).catch(err => {
            res.status(400).send(err)
        })    
        return
    }

    res.status(400).send(error.message)

});

// DELETE
router.delete('/:email', (req, res) => {
    let email = req.params.email
    let user = deleteUser(email);

    user.then(() => {
        res.send('Usuario elminado')
    }).catch(err => {
        res.status(400).send(`Error: ${err}`)
    })
});

module.exports = router;
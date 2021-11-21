const mongoose = require('mongoose');
// conecting with mongoBD 

(async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/crm')
        console.log('Database connected to: ',db.connection.name)
    } catch (err) {
        console.log(err)
    }
})()

import { selector } from "./main";
import "regenerator-runtime/runtime";

let form = selector('#form');
let objectFormData = {
    name: '',
    email: '',
    company: '',
    phone: ''
}
const sendDataDB = async (json) => {
    const url = 'http://localhost:8080/clientes';
    try {
        let result = await fetch(url, {
            method: 'Post',
            body: json
        })
        let status = await result.status
        if (status === '200') {
            console.log('Enviado');
            return
        }
    } catch (error) {
        console.log(error)
    }
}
const dataSend = () => {
    let name = selector('#name');
    let email = selector('#email');
    let company = selector('#company');
    let phone = selector('#phone');
    
    objectFormData = {
        name: name.value,
        email: email.value,
        company: company.value,
        phone: phone.value
    }

    let objJSON = JSON.stringify(objectFormData)

    // console.log(objJSON)
    sendDataDB(objJSON)
}



    // btnDisabled();
form.addEventListener('submit', (e) => {
    e.preventDefault();
    dataSend()
})


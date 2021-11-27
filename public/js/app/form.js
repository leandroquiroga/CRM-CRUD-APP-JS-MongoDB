import { selector, ui } from "./main";
import "regenerator-runtime/runtime";

let form = selector('#form');
let name = selector('#name');
let email = selector('#email');
let puesto = selector('#puesto');
let phone = selector('#phone');

const validateForm = () => {
    let ok = false;
    if (name.value === '' || email.value === '' || puesto.value === '' || phone.value === '') {
        let message = selector('.msgErr');
        message.textContent = 'Todos los campos son obligatorios';

        setTimeout(() => {
            message.textContent = ''
        }, 3000)
        return ok;
    }

    return ok = true;
}

let objectFormData = {
    name: '',
    email: '',
    puesto: '',
    phone: ''
}
const sendDataDB = async (json) => {
    const url = 'http://localhost:8080/clientes';
    try {
        let result = await fetch(url, {
            method: 'Post',
            body: json
        })
        console.log(result)
        if (result.status === 200) {
            let alert = selector('#alert-success')
            ui.alertShow(`Se ha añadido un nuevo cliente a la bases de datos`, alert)
        }
    } catch (error) {
        console.log(error)
    }
}
const dataSend = () => {
    objectFormData = {
        name: name.value,
        email: email.value,
        puesto: puesto.value,
        phone: phone.value
    }

    let objJSON = JSON.stringify(objectFormData)
    sendDataDB(objJSON)
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        dataSend()
        return
    };
})
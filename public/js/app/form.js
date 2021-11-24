import { selector } from "./main";
import "regenerator-runtime/runtime";

let form = selector('#form');
let name = selector('#name');
let email = selector('#email');
let company = selector('#company');
let phone = selector('#phone');

const validateForm = () => {
    let ok = false;

    console.log(ok)
    if (name.value === '' || email.value === '' || company.value === '' || phone.value === '') {
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
        if (result.status === 200) {
            let alert = selector('#alert-success');
            let title = selector('.title-alert')
            alert.classList.remove('visually-hidden');
            title.textContent = `Se ha añadido un nuevo cliente a la bases de datos`
            setTimeout(() => {
                alert.classList.add('visually-hidden');
                title.textContent = ''
            }, 2500);
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
    sendDataDB(objJSON)
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        dataSend()
        return
    };
})
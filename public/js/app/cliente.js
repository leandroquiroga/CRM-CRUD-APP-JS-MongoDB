import { selector, creator, ui } from './main';
import "regenerator-runtime/runtime";


// Delete an client of Database
const deleteClient = async (email) => {
    const url = `http://localhost:8080/clientes/${email}`;
    try {
        let response = await fetch(url, { method: 'Delete' });
        // if status = 200 then clear the child node of card and show message success
        if (response.status === 200) {
            let alert = selector('#alert-danger')
            let cards = selector('.cards-client');
            ui.cleanHTML(cards);
            ui.alertShow(`Se ha eliminado sastifactoriamente de la bases de datos`, alert);
             setTimeout(() => {
                window.location.reload()
            }, 2500)
        }
    } catch (error) {
        console.log(err)
    }
}

const editClient = async(user) => {
    let form = selector('#form_Edit');
    
    // displays current item values
    inputValue(form, user)

    // Submit item values change
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendNewData()
    })

    function inputValue(form, user) {
        const { name, phone, email, puesto } = user;

        form.childNodes[3].value = name
        form.childNodes[7].value = email
        form.childNodes[11].value = puesto
        form.childNodes[15].value = phone
    }

    // Create a new object for send the database
    function sendNewData() {
        let name = selector('#name').value;
        let email = selector('#email').value;
        let puesto = selector('#puesto').value;
        let phone = selector('#phone').value;
    
        let objDataNew = {
            name,
            email,
            puesto,
            phone
        }
        let objJSON = JSON.stringify(objDataNew)
        editInfoDataBase(objJSON);
    }

    // send the object and make a request for a change of values
    async function editInfoDataBase(json) {
        const { email } = user;
        console.log(email)
        const url = `http://localhost:8080/clientes/${email}`;
        try {
            let response = await fetch(url, { method: 'Put', body: json });
            if (response.status === 200) {
                ui.alertSuccesEdit(`Los datos fueron actualizados`)
                setTimeout(() => {
                    window.location.reload()
                }, 2500)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
// Show informatios of cliente from Database
const arrInfo = (arr) => {
    let div = selector('.cards-client')

    arr.forEach(user => {
        let divCard = creator('div');
        let divBody = creator('div');
        let h5 = creator('h5');
        let ul = creator('ul');
        let liEmail = creator('li');
        let liCompany = creator('li');
        let liPhone = creator('li');
        let divButtons = creator('div');
        let btnDelete = creator('button')
        let btnEdit = creator('button');
        const { name, puesto, email, phone} = user;

        // div card
        divCard.classList.add('card', 'shadow-lg');
        divCard.style.width = '300px';
        divCard.style.heigth = '250px';
/*         
        divCard.style.heigth = '250px'; */

        // div body card
        divBody.classList.add('card-body');
        divCard.appendChild(divBody);

        // title card
        h5.classList.add('card-title');
        h5.textContent = name;
        divBody.appendChild(h5);

        // list group
        ul.classList.add('list-group', 'list-group-flush')
        divBody.appendChild(ul);

        liEmail.classList.add('list-group-item')
        liEmail.textContent = `Email: ${email}`;
        ul.appendChild(liEmail);

        liCompany.classList.add('list-group-item');
        liCompany.textContent = `Puesto: ${puesto}`;
        ul.appendChild(liCompany);

        liPhone.classList.add('list-group-item');
        liPhone.textContent = `Tel: ${phone}`;
        ul.appendChild(liPhone);



        // buttons edit and delete
        divButtons.classList.add('d-flex', 'justify-content-around', 'p-2');
        divBody.appendChild(divButtons);

        btnDelete.classList.add('btn', 'btn-dark', 'text-white', 'p-2', 'buttons-card');
        btnDelete.textContent = 'Eliminar';
        btnDelete.type = 'button'
        btnDelete.onclick = () => {
            deleteClient(email);
        }
        divButtons.appendChild(btnDelete);


        btnEdit.classList.add('btn', 'btn-dark', 'text-white', 'p-2', 'buttons-card');
        btnEdit.textContent = 'Editar';
        btnEdit.type = 'button'
        btnEdit.setAttribute('data-bs-toggle','modal')
        btnEdit.setAttribute('data-bs-target','#form_Modal')
        btnEdit.onclick = () => {
            editClient(user);
        }
        divButtons.appendChild(btnEdit);

        div.appendChild(divCard);
    });
    
}

// Query at the database if it has at last one element
const showDataBase = async () => {
    const url = 'http://localhost:8080/clientes';
    let img = selector('.data');
    let contentCards = selector('.cards-client');
    try {
        let response = await fetch(url, { method: 'Get' });
        let data = await response.json();
        if (data.length >= 1) {
            contentCards.classList.remove('visually-hidden');
            img.classList.add('visually-hidden');
            arrInfo(data)
            return
        }
        img.classList.remove('visually-hidden');
        contentCards.classList.add('visually-hidden');
    }catch{err => console.log(err)}
}

document.addEventListener('DOMContentLoaded', () => {
    showDataBase();
});
import "regenerator-runtime/runtime";
import { selector, creator } from './main';

/*
                <div class="card shadow-lg p-2" style="width: 300px;">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

*/

const arrInfo = (arr) => {
    let div = selector('.cards-client');
    let divCard = creator('div');

    divCard.classList.add('cards-client');
    arr.forEach( user => {
        const { name, company, email, phone } = user;
         divCard.innerHTML += `
                <div class="card shadow-lg p-2" style="width: 300px;">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <ul class="list-group list-group-flush p-0">
                            <li class="list-group-item"><strong>Email:</strong> ${email}</li>
                            <li class="list-group-item"><strong>Compañia:</strong> ${company}</li>
                            <li class="list-group-item"><strong>Telefono:</strong> ${phone}</li>
                        </ul>
                    </div>
                </div>
        ` 
        console.log(divCard)
        div.appendChild(divCard)
        
    });
}


const showDataBase = async () => {
    let url = 'http://localhost:8080/clientes';

    try {
        let response = await fetch(url, {method: 'Get'});
        let data = await response.json();
        arrInfo(data)
    }catch{err => console.log(err)}
}


document.addEventListener('DOMContentLoaded', () => {
    showDataBase()
})
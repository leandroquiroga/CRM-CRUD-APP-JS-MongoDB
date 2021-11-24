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

    console.log(arr)
    arr.forEach(user => {
        const { name, company, email, phone } = user;

        divCard.innnerHTML += `
                <div class="card shadow-lg p-2" style="width: 300px;">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${email}</li>
                            <li class="list-group-item">${company}</li>
                            <li class="list-group-item">${phone}</li>
                        </ul>
                    </div>
                </div>

        
        `
        div.appendChild(divCard)
    })

    
}


const showDataBase = async () => {
    let url = 'http://localhost:8080/clientes';

    try {
        let response = await fetch(url, {
            method: 'Get'
        });
        let data = await response.json();
        console.log(data)
        arrInfo(data)
    }catch{err => console.log(err)}
}


document.addEventListener('DOMContentLoaded', () => {
    showDataBase()
})
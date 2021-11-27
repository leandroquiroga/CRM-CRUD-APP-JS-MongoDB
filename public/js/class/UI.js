import { selector } from "../app/main";
import { creator } from './../app/main';

export class UI {
    alertShow(text, id) {
        let alert = id;
        let title = selector('.title-alert')
        alert.classList.remove('visually-hidden');
        title.textContent = text
        setTimeout(() => {
            alert.classList.add('visually-hidden');
            title.textContent = ''
        }, 2500);
    }

    cleanHTML(div) {
        while (div.firstChild) {
            div.removeChild(div.firstChild)
        }
    }
    alertSuccesEdit(text) {
        let alert = selector('#alert-success-edit');
        let title = selector('.title-alert-edit')
        alert.classList.remove('visually-hidden');
        title.textContent = text
        setTimeout(() => {
            alert.classList.add('visually-hidden');
            title.textContent = ''
        }, 2500);
    }
}
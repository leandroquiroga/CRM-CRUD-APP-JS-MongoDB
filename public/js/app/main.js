export const selector = (element) => document.querySelector(element);
export const selectorAll = (element) => document.querySelectorAll(element)
export const creator = (element) => document.createElement(element);


/* ========== Functions =================== */
const aside = () => {
    let aside = selector('.aside-menu');
    let title = selector('.title-aside');
    let user = selector('#list-user')
    let addUser = selector('#new-users');
    let items = selectorAll('.items');
    let header = selector('.header');
    let input = selector('.input');
    let menu = selector('.menu-principal');
    let card = selector('.card-form')

    if (aside.style.width == '300px') {
        header.classList.remove('justify-content-between', 'align-items-center')
        items[0].style.width = '70px'
        items[1].style.width = '70px'
        aside.style.width = '70px';
        title.textContent = '';
        user.classList.add('hidden');
        addUser.classList.add('hidden');
        input.classList.add('hidden');
        menu.style.width = "95%";
        return
    }

    aside.style.width = '300px';
    addUser.classList.remove('hidden')
    header.classList.add('justify-content-between', 'align-items-center')
    input.classList.remove('hidden')
    user.classList.remove('hidden')
    title.textContent = 'CRM CRUD';
    items[0].style.width = '100%'
    items[1].style.width = '100%'

};
const listeners = () => {
    let menu = selector('#menu');
    menu.addEventListener('click', aside)
};
export const initAPP = () => {
    document.addEventListener('DOMContentLoaded', () => {
        listeners();
    })
}
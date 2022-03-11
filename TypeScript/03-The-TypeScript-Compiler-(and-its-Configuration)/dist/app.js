"use strict";
const buttonElement = document.querySelector('button');
function clickHandler(msg) {
    console.log('Clicked!!!' + msg);
}
buttonElement.addEventListener('click', clickHandler.bind(null, 'Voila!'));

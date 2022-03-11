const buttonElement = document.querySelector('button')!;

function clickHandler(msg: string) {
    console.log('Clicked!!!' + msg);
}

buttonElement.addEventListener(
    'click',
    clickHandler.bind(null, 'Voila!')
);
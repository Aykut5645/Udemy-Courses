const html = {
    modal: () => document.querySelector('.modal'),
    backgdrop: () => document.querySelector('.backdrop'),
    selectPlanButtons: () => document.querySelectorAll('.plan button'),
    modalNoButton: () => document.querySelector('.modal__action--negative')
};

html.backgdrop().addEventListener('click', closeModal);
html.modalNoButton().addEventListener('click', closeModal);
html.selectPlanButtons().forEach(currentButton => currentButton.addEventListener('click', openModal));

function closeModal() {
    html.modal().style.display = 'none';
    html.backgdrop().style.display = 'none';
}

function openModal() {
    html.modal().style.display = 'block';
    html.backgdrop().style.display = 'block';
}
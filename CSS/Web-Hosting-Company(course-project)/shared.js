const backgdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const selectPlanButtons = document.querySelectorAll('.plan button');

selectPlanButtons.forEach(currentButton => {
    currentButton.addEventListener('click', () => {
        backgdrop.style.display = 'block';
        modal.style.display = 'block';
    });
});
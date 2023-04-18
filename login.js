const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

input.addEventListener('input', () => {
    if(input.value.length > 0) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    localStorage.setItem('player', input.value);
    window.location = 'game.html';
})
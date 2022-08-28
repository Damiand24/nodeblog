const form = document.querySelector('#register-form');
const error = document.querySelector('.error-text'); 
const _csrf = document.querySelector('#csToken').value;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#username').value;
    const pass = document.querySelector('#pass').value;
    const rPass = document.querySelector('#rPass').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username,
            pass,
            rPass,
            _csrf
        })
    })
    .then(res => {
        if(res.status !== 200) {
            return res.json();
        } 
        else if (res.status == 200) {
            return window.location.replace(res.url);
        }
    })
    .then(data => {
        if(data) {
            error.textContent = data.response;
        }
    })
    .catch(err => console.log(err));  
});
const form = document.querySelector('#blog-form');
const error = document.querySelector('.error-text'); 
const _csrf = document.querySelector('#csToken').value;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.querySelector('#title').value;
    const snippet = document.querySelector('#snippet').value;
    const body = document.querySelector('#body').value;

    fetch('/blog/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title,
            snippet,
            body,
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
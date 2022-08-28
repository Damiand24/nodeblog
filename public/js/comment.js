const form = document.querySelector('#comment-form');
const error = document.querySelector('.error-text'); 
const postId = form.dataset.id;
const _csrf = document.querySelector('#csToken').value;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const comment = document.querySelector('#comment').value;

    fetch('/blog/' + postId + '/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            comment,
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
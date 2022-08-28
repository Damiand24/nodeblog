const btns = document.querySelectorAll('.banUser');
const aa = document.querySelectorAll('.sus')
const checkSus = document.querySelectorAll(`.sus`)

for(let i = 0; checkSus.length > i; i++) {
    if(checkSus[i].textContent === 'true') {
        btns[i].textContent = 'Unblock';
    }
}

for(let i = 0; btns.length > i; i++) {
    btns[i].addEventListener('click', () => {

        btns[i].classList.add('disabled');
        fetch('/admin/users', {
            method: 'POST',
            headers: { 'CSRF-Token': _csrf, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: btns[i].dataset.user
            })
        })
        .then(res => {
            if(res) {
                window.location.reload();
            }
        })
        .catch(err => console.log(err))   
    })
}
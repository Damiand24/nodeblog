const logout = document.querySelector('#logoutBtn');
const _csrf = logout.dataset.token;

logout.addEventListener('click', (e) => {
    fetch('/logout', {
    method: 'POST',
    headers: { 'CSRF-Token': _csrf },
    })
    .then(res => window.location.reload())
    .catch(err => console.log(err))
})
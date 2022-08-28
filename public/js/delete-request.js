const del = document.querySelector('.delete-btn');

del.addEventListener('click', (e) => {
    fetch(`/blog/${del.dataset.id}`, {
    method: 'delete',
    headers: { 'CSRF-Token': _csrf },
    })
    .then(res => res.json())
    .then(res => window.location.href = res.redirect)
    .catch(err => console.log(err))
})

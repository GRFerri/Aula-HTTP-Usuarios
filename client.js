// client-side script for handling comments

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#comentarios form');
    const lista = document.querySelector('.comentario-lista');
    let comentarios = [];

    function renderComentarios(items) {
        lista.innerHTML = '';
        items.forEach(c => {
            const item = document.createElement('div');
            item.className = 'comentario-item';
            item.innerHTML = `<strong>${c.nome}:</strong>\n<p>${c.comentario}</p>`;
            lista.appendChild(item);
        });
    }

    // fetch existing comments when page loads
    fetch('http://localhost:3000/comentarios')
        .then(res => res.json())
        .then(data => {
            comentarios = data;
            renderComentarios(comentarios);
        })
        .catch(err => console.error('Erro ao carregar comentários:', err));

    form.addEventListener('submit', e => {
        e.preventDefault();
        const nome = form.nome.value.trim();
        const comentario = form.comentario.value.trim();
        if (!nome || !comentario) return;

        fetch('http://localhost:3000/comentarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, comentario })
        })
            .then(res => res.json())
            .then(novo => {
                comentarios.push(novo);
                renderComentarios(comentarios);
                form.reset();
            })
            .catch(err => console.error('Erro ao enviar comentário:', err));
    });
});
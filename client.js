// client-side script for handling comments

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#comentarios form');
    const lista = document.querySelector('.comentario-lista');
    let comentarios = [];

    function renderComentarios(items) {
        lista.innerHTML = '';
        items.forEach((c, index) => {
            const item = document.createElement('div');
            item.className = 'comentario-item';
            item.innerHTML = `
                <div class="comentario-header">
                    <strong>${c.nome}:</strong>
                    <button class="btn-delete" onclick="deleteComentario(${index})" title="Deletar comentário">🗑️</button>
                </div>
                <p>${c.comentario}</p>
            `;
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

    // Função para deletar comentário
    window.deleteComentario = (index) => {
        if (confirm('Tem certeza que deseja deletar este comentário?')) {
            const comentarioId = comentarios[index].id;
            fetch(`http://localhost:3000/comentarios/${comentarioId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(() => {
                    comentarios.splice(index, 1);
                    renderComentarios(comentarios);
                })
                .catch(err => console.error('Erro ao deletar comentário:', err));
        }
    };
});
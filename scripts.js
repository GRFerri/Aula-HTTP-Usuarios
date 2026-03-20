// --- SISTEMA DE TEMA (FORÇA BRUTA) ---

// Função global para trocar o tema
window.toggleTheme = function() {
    let html = document.documentElement;
    let temaAtual = html.getAttribute('data-bs-theme');
    let novoTema = (temaAtual === 'dark') ? 'light' : 'dark';
    
    // Aplica o novo tema
    html.setAttribute('data-bs-theme', novoTema);
    localStorage.setItem('theme', novoTema);
    
    // Arruma o botão da barra superior (se ele existir na página)
    let botaoNav = document.getElementById('theme-toggle');
    if (botaoNav) {
        if (novoTema === 'dark') {
            botaoNav.innerHTML = '<i class="bi bi-sun-fill text-warning"></i>';
        } else {
            botaoNav.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    }
    
    // Arruma o botão de liga/desliga nas configurações (se ele existir na página)
    let botaoConfig = document.getElementById('themeSwitch');
    if (botaoConfig) {
        botaoConfig.checked = (novoTema === 'dark');
    }
};

// Quando a página carregar inteira, aplica o tema salvo
window.onload = function() {
    let temaSalvo = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', temaSalvo);
    
    let botaoNav = document.getElementById('theme-toggle');
    if (botaoNav) {
        botaoNav.innerHTML = (temaSalvo === 'dark') ? '<i class="bi bi-sun-fill text-warning"></i>' : '<i class="bi bi-moon-fill"></i>';
    }
    
    let botaoConfig = document.getElementById('themeSwitch');
    if (botaoConfig) {
        botaoConfig.checked = (temaSalvo === 'dark');
    }
};

// --- SISTEMA DO FEED (COMENTÁRIOS E LIKES) ---

window.simularLogout = function() {
    alert("Você deserdou da gangue do Van der Linde. Até logo, parceiro!");
    window.location.href = "login.html";
};

window.handleLike = function(btn) {
    let icon = btn.querySelector('i');
    if (icon.classList.contains('bi-heart')) {
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        btn.innerHTML = `<i class="bi bi-heart-fill"></i> Sacado!`;
    } else {
        icon.classList.replace('bi-heart-fill', 'bi-heart');
        btn.innerHTML = `<i class="bi bi-heart"></i> Sacar (Honra)`;
    }
};

window.toggleCommentForm = function(btn) {
    let commentsSection = btn.closest('.post-card').querySelector('.post-comments');
    if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
        commentsSection.style.display = 'block';
        commentsSection.querySelector('input').focus();
    } else {
        commentsSection.style.display = 'none';
    }
};

window.handleCommentSubmit = function(event, form) {
    event.preventDefault();
    let input = form.querySelector('input');
    let text = input.value.trim();
    if (!text) return;

    let commentsList = form.closest('.post-comments').querySelector('.comments-list');
    let newComment = document.createElement('div');
    newComment.className = 'text-muted small Lora ps-3 border-start border-danger mb-2 py-1';
    newComment.innerHTML = `<strong class="text-danger">Arthur Morgan:</strong> ${text}`;

    commentsList.appendChild(newComment);
    input.value = '';
};

window.handleNewPost = function(event) {
    event.preventDefault();
    let textarea = document.getElementById('new-post-text');
    let text = textarea.value.trim();
    if (!text) return;

    let feedContainer = document.getElementById('feed-container');
    let newPost = document.createElement('div');
    newPost.className = 'card post-card shadow border-danger mb-4';
    let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    newPost.innerHTML = `
        <div class="post-header d-flex align-items-center">
            <img src="https://i.pinimg.com/736x/8a/10/7a/8a107a6ebbb56738928178a9c29808a7.jpg" class="rounded-circle me-3 border border-danger" width="50" height="50" style="object-fit: cover;">
            <div>
                <h5 class="m-0"><a href="perfil.html" class="text-decoration-none text-danger Rye">Arthur Morgan</a></h5>
                <small class="text-muted Lora">Agora mesmo às ${time} • <i class="bi bi-geo-alt"></i> Acampamento</small>
            </div>
        </div>
        <div class="post-body">
            <p class="Lora fs-5 m-0 p-2">${text}</p>
        </div>
        <div class="post-actions d-flex gap-3">
            <button class="btn btn-link text-decoration-none p-0 text-danger Lora" onclick="handleLike(this)"><i class="bi bi-heart"></i> Sacar (Honra)</button>
            <button class="btn btn-link text-decoration-none p-0 text-muted Lora" onclick="toggleCommentForm(this)"><i class="bi bi-chat-left"></i> Responder</button>
        </div>
        <div class="post-comments p-3 border-top border-danger" style="display: none; background-color: rgba(0,0,0,0.02);">
            <div class="comments-list mb-3"></div>
            <form class="d-flex" onsubmit="handleCommentSubmit(event, this)">
                <input type="text" class="form-control form-control-sm me-2 Lora border-danger" placeholder="Deixe um recado..." required>
                <button type="submit" class="btn btn-rdr btn-sm">Enviar</button>
            </form>
        </div>
    `;
    
    feedContainer.prepend(newPost);
    textarea.value = '';
};
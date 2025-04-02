function onHashChange() {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    const hash = location.hash.substring(1) || 'home';
    const activeView = document.getElementById(hash);
    if (activeView) activeView.classList.add('active');
}

window.addEventListener('hashchange', onHashChange);
window.addEventListener('load', onHashChange);
// Inizializzazione Tooltip
document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    fetch('json/index.json')
        .then(response => response.json())
        .then(data => {
            // Popola il navbar
            const navbarBrandText = document.getElementById('navbar-brand-text');
            navbarBrandText.textContent = data.navbar.brand.text;

            const navbarLinks = document.getElementById('navbar-links');
            data.navbar.links.forEach(link => {
                const listItem = document.createElement('li');
                listItem.className = 'nav-item';
                listItem.innerHTML = `<a class="nav-link" href="${link.href}">${link.text}</a>`;
                navbarLinks.appendChild(listItem);
            });

            // Popola la sezione hero
            document.getElementById('hero-heading').textContent = data.hero_section.heading;
            document.getElementById('hero-paragraph').textContent = data.hero_section.paragraph;
            const heroButton = document.getElementById('hero-button');
            heroButton.textContent = data.hero_section.button.text;
            heroButton.href = data.hero_section.button.href;

            // Popola la sezione informativa
            const infoSection = document.getElementById('info-section');
            data.info_section.forEach(info => {
                const col = document.createElement('div');
                col.className = 'col-md-3';
                col.innerHTML = `
                    <div class="card p-4">
                        <h2>${info.title}</h2>
                        <i class="${info.icon} icon"></i>
                        <p>${info.description}</p>
                        <a href="${info.button.href}" class="btn btn-outline-light mt-3">${info.button.text}</a>
                    </div>
                `;
                infoSection.appendChild(col);
            });

            // Popola il footer
            document.getElementById('footer-text').textContent = data.footer.text;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});

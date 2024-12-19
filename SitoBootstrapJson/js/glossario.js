// Funzione per caricare e visualizzare il glossario
document.addEventListener("DOMContentLoaded", function() {
    // Recupera il file JSON
    fetch('json/glossario.json')
        .then(response => response.json())  // Converte la risposta in formato JSON
        .then(data => {
            // Inserisce il titolo e la descrizione nel documento HTML
            document.querySelector('h1').textContent = data.title;
            document.querySelector('.container p').textContent = data.description;

            // Aggiunge i termini del glossario
            const listContainer = document.querySelector('.list-group');
            data.terms.forEach(term => {
                // Crea un nuovo elemento <li> per ogni termine
                const listItem = document.createElement('li');
                listItem.classList.add('section');

                // Aggiungi il termine e la sua definizione
                listItem.innerHTML = `<strong>${term.term}:</strong> ${term.definition}`;

                // Aggiungi il link, se presente
                if (term.link) {
                    const link = document.createElement('a');
                    link.href = term.link;
                    link.textContent = term.link_text || 'Scopri di più';
                    listItem.appendChild(link);
                }

                // Aggiungi l'elemento alla lista
                listContainer.appendChild(listItem);
            });

            // Aggiungi il footer
            const footer = document.querySelector('footer p');
            footer.textContent = data.footer;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});

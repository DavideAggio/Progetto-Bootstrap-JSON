document.addEventListener('DOMContentLoaded', function() {
    fetch('json/socket.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('socketContent');
            
            // Create the title of the page
            const title = document.createElement('h1');
            title.textContent = data.page.title;
            contentDiv.appendChild(title);
            
            // Iterate over sections
            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('section');
                
                // Section title
                const sectionTitle = document.createElement('h2');
                sectionTitle.textContent = section.title;
                sectionDiv.appendChild(sectionTitle);

                // Content of the section
                section.content.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.innerHTML = paragraph;
                    sectionDiv.appendChild(p);
                });

                // Subsections
                section.subsections && section.subsections.forEach(subsection => {
                    const subTitle = document.createElement('h3');
                    subTitle.textContent = subsection.title;
                    sectionDiv.appendChild(subTitle);

                    subsection.content.forEach(subParagraph => {
                        const p = document.createElement('p');
                        p.innerHTML = subParagraph;
                        sectionDiv.appendChild(p);
                    });

                    if (subsection.advantages) {
                        const ul = document.createElement('ul');
                        subsection.advantages.forEach(item => {
                            const li = document.createElement('li');
                            li.innerHTML = `<strong>Vantaggi:</strong> ${item}`;
                            ul.appendChild(li);
                        });
                        sectionDiv.appendChild(ul);
                    }

                    if (subsection.uses) {
                        const ul = document.createElement('ul');
                        subsection.uses.forEach(item => {
                            const li = document.createElement('li');
                            li.innerHTML = `<strong>Usi comuni:</strong> ${item}`;
                            ul.appendChild(li);
                        });
                        sectionDiv.appendChild(ul);
                    }
                });

                // Add sources
                if (section.sources) {
                    const sourcesList = document.createElement('ul');
                    section.sources.forEach(source => {
                        const li = document.createElement('li');
                        li.innerHTML = `<a href="${source.href}" target="_blank">${source.text}</a>`;
                        sourcesList.appendChild(li);
                    });
                    sectionDiv.appendChild(sourcesList);
                }

                // Append section to the main content
                contentDiv.appendChild(sectionDiv);
            });

            // Applications section
            const appsSection = data.sections.find(section => section.title === "Applicazioni reali delle socket");
            if (appsSection) {
                const appsTitle = document.createElement('h2');
                appsTitle.textContent = appsSection.title;
                contentDiv.appendChild(appsTitle);

                const appsList = document.createElement('ul');
                appsSection.applications.forEach(app => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${app.category}:</strong> ${app.description}`;
                    appsList.appendChild(li);
                });
                contentDiv.appendChild(appsList);
            }
        })
        .catch(err => console.error('Error loading the JSON:', err));
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("json/osi.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nel caricamento del file JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(osiData => {
            // Set page title
            document.getElementById("page-title").textContent = osiData.page.title;

            // Render sections
            const sectionsContainer = document.getElementById("sections");
            osiData.sections.forEach(section => {
                const sectionDiv = document.createElement("div");
                sectionDiv.classList.add("section", "my-4");

                // Section title
                const title = document.createElement("h2");
                title.textContent = section.title;
                sectionDiv.appendChild(title);

                // Section content
                section.content.forEach(paragraph => {
                    const p = document.createElement("p");
                    p.textContent = paragraph;
                    sectionDiv.appendChild(p);
                });

                // List items
                if (section.list) {
                    const ul = document.createElement("ul");
                    section.list.forEach(item => {
                        const li = document.createElement("li");
                        li.textContent = item;
                        ul.appendChild(li);
                    });
                    sectionDiv.appendChild(ul);
                }

                // Subsections
                if (section.subsections) {
                    section.subsections.forEach(subsection => {
                        const subTitle = document.createElement("h3");
                        subTitle.textContent = subsection.title;
                        sectionDiv.appendChild(subTitle);

                        if (subsection.content) {
                            subsection.content.forEach(subParagraph => {
                                const p = document.createElement("p");
                                p.textContent = subParagraph;
                                sectionDiv.appendChild(p);
                            });
                        }

                        if (subsection.list) {
                            const ul = document.createElement("ul");
                            subsection.list.forEach(item => {
                                const li = document.createElement("li");
                                li.textContent = item;
                                ul.appendChild(li);
                            });
                            sectionDiv.appendChild(ul);
                        }
                    });
                }

                // Sources
                if (section.sources) {
                    const sourcesDiv = document.createElement("div");
                    sourcesDiv.classList.add("sources");
                    const sourcesTitle = document.createElement("h4");
                    sourcesTitle.textContent = "Fonti:";
                    sourcesDiv.appendChild(sourcesTitle);

                    section.sources.forEach(source => {
                        const link = document.createElement("a");
                        link.href = source.href;
                        link.textContent = source.text;
                        link.target = "_blank";
                        sourcesDiv.appendChild(link);
                        sourcesDiv.appendChild(document.createElement("br"));
                    });

                    sectionDiv.appendChild(sourcesDiv);
                }

                sectionsContainer.appendChild(sectionDiv);
            });
        })
        .catch(error => {
            console.error("Errore:", error);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Errore nel caricamento dei dati. Riprova più tardi.";
            document.getElementById("sections").appendChild(errorMessage);
        });
});

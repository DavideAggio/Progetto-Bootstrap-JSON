document.addEventListener("DOMContentLoaded", () => {
  fetch("json/tcp_udp.json")
      .then(response => {
          if (!response.ok) {
              throw new Error(`Errore nel caricamento del file JSON: ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          // Navbar
          const navbarBrand = document.getElementById("navbar-brand");
          navbarBrand.href = data.page.navbar.brand.link;
          navbarBrand.innerHTML = `<i class="${data.page.navbar.brand.icon}"></i> ${data.page.navbar.brand.text}`;
          
          const navbarLinks = document.getElementById("navbar-links");
          data.page.navbar.links.forEach(link => {
              const li = document.createElement("li");
              li.className = "nav-item";
              li.innerHTML = `<a class="nav-link${link.active ? " active" : ""}" href="${link.link}">${link.text}</a>`;
              navbarLinks.appendChild(li);
          });

          // Page Title
          document.getElementById("page-title").textContent = data.page.title;

          // Content
          const contentContainer = document.getElementById("content");
          data.content.forEach(section => {
              const sectionDiv = document.createElement("div");
              sectionDiv.classList.add("section", "mb-4");

              // Section Title
              const title = document.createElement("h2");
              title.textContent = section.title;
              sectionDiv.appendChild(title);

              // Paragraphs
              if (section.paragraphs) {
                  section.paragraphs.forEach(paragraph => {
                      const p = document.createElement("p");
                      p.textContent = paragraph;
                      sectionDiv.appendChild(p);
                  });
              }

              // Subsections
              if (section.subsections) {
                  section.subsections.forEach(subsection => {
                      const subTitle = document.createElement("h3");
                      subTitle.textContent = subsection.title;
                      sectionDiv.appendChild(subTitle);

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

              // Table
              if (section.table) {
                  const table = document.createElement("table");
                  table.className = "table table-dark table-striped";
                  
                  const thead = document.createElement("thead");
                  const headerRow = document.createElement("tr");
                  section.table.headers.forEach(header => {
                      const th = document.createElement("th");
                      th.textContent = header;
                      headerRow.appendChild(th);
                  });
                  thead.appendChild(headerRow);
                  table.appendChild(thead);

                  const tbody = document.createElement("tbody");
                  section.table.rows.forEach(row => {
                      const tr = document.createElement("tr");
                      row.forEach(cell => {
                          const td = document.createElement("td");
                          td.textContent = cell;
                          tr.appendChild(td);
                      });
                      tbody.appendChild(tr);
                  });
                  table.appendChild(tbody);

                  sectionDiv.appendChild(table);
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

              contentContainer.appendChild(sectionDiv);
          });

          // Footer
          document.getElementById("footer-text").textContent = data.footer.text;
      })
      .catch(error => {
          console.error("Errore:", error);
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Errore nel caricamento dei dati. Riprova più tardi.";
          document.getElementById("content").appendChild(errorMessage);
      });
});

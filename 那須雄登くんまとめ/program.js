const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const program = data.find(p => p.id === id);

        document.getElementById("title").textContent = program.title;

        const official = document.getElementById("official");
        program.officialLinks.forEach(link => {
            official.innerHTML += `<a href="${link.url}" target="_blank">${link.label}</a><br>`;
        });

        const episodes = document.getElementById("episodes");
        program.episodes.forEach(ep => {
            let html = `
                <div>
                    <p>${ep.date}</p>
                    <h3>${ep.title}</h3>
            `;        
            
            if (ep.links) {
                html += ep.links
                    .map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`)
                    .join(" / ");
            }

            if (ep.xlinks) {
                html += ep.xlinks
                    .map(url => `
                        <blockquote class="twitter-tweet">
                            <a href="${url}"></a>
                        </blockquote>
                    `)
                    .join("");
            }

            html += `</div>`;

            document.getElementById("episodes").innerHTML += html;
            
        });
    });
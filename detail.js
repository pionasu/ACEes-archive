const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const program = data.find(p => p.id === id);

        if (!program) {
            document.body.innerHTML = "データが見つからない";
            return;
        }

        document.body.innerHTML = `
            <h1>${program.title}</h1>

            ${program.episodes.map(ep => `
                <div onclick="location.href='episode.html?id=${program.id}&ep=${ep.id}'" style="cursor:pointer;">
                    <p>${ep.date}</p>
                    <h3>${ep.title}</h3>
                </div>
            `).join("")}
        `;
    });
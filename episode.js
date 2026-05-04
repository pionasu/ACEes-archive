const params = new URLSearchParams(location.search);
const programId = params.get("id");
const epId = params.get("ep");

fetch("data.json")
    .then(res => res.json())
    .then(data =>{
        const program = data.find(p => p.id == programId);
        const episode = program.episodes.find(e => e.id == epId);

        document.getElementById("date").textContent = episode.date;
        document.getElementById("title").textContent = episode.title;

        let html = "";

        if (episode.links) {
            html += episode.links
                .map(l => `<a href="${l.url}" target="_blank">${l.label}</a><br>`)
                .join("");
        }

        if (episode.xLinks) {
            html += episode.xLinks
                .map(url => `
                    <blockquote class="twitter-tweet">
                        <a href="${url}"></a>
                    </blockquote>
                `)
                .join("");
        }

        document.getElementById("links").innerHTML = html;

        function loadTwitter() {

            if (window.twttr && window.twttr.widgets) {
                window.twttr.widgets.load(document.getElementById("links"));
        } else {
                setTimeout(loadTwitter, 1000);
            }
        };

        loadTwitter();
    });

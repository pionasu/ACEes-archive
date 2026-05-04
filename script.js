let data = [];
let selectedTag = "";
let currentDate = new Date();
let selectedDate = null;

fetch("data.json")
    .then(res => res.json())
    .then(json => {
        data = json;
        renderTags();
        renderList(data);
        renderCalendar(data);
        renderTVer(data);

        document.getElementById("prev").onclick = () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(data);
        };

        document.getElementById("next").onclick = () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(data);
        };
    });

document.getElementById("search").addEventListener("input", e => {
    filter(e.target.value);
});

function renderTags() {
    const tagBox = document.getElementById("tags");
    const tags = [...new Set(data.flatMap(d => d.tags))];

    tags.forEach(tag => {
        const el = document.createElement("span");
        el.textContent = tag;
        el.className = "tag";
        el.onclick = () => {
            selectedTag = tag;
            filter(document.getElementById("search").value);
        };
        tagBox.appendChild(el);
    });
}

function filter(keyword) {
    let filtered = data.filter(item =>
        item.title.includes(keyword) ||
        item.tags.join().includes(keyword)
    );
    
    if (selectedTag) {
        filtered = filtered.filter(item =>
            item.tags.includes( selectedTag)
        );
    }

    renderList(filtered);
}

function renderList(list) {
    const container = document.getElementById("list");
    container.innerHTML = "";

    list.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        
        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.date}</p>
            <a href="detail.html?id=${item.id}">詳細</a>
        `;

        container.appendChild(div);
    });
}

function renderCalendar(data) {
    const calendar = document.getElementById("calendar");
    if (!calendar) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthLabel = document.getElementById("month");
    if (monthLabel) {
       monthLabel.textContent = `${year}年 ${month + 1}月`; 
    }
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month +1, 0).getDate();

    calendar.innerHTML = "";

    const days = ["月", "火", "水", "木", "金", "土", "日"];

    days.forEach(d => {
        calendar.innerHTML += `<div class="weekday">${d}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += `<div></div>`;
    }
    for (let day = 1; day <= lastDate; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const today = new Date();
        const isToday =
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate();
        let className = "day";
        if (isToday) className += " today";
        let html = `<div class="${className}" onclick="filterByDate('${dateStr}')"
        ><strong>${day}</strong>`;

        data.forEach(item => {
            if (item.date === dateStr){
                html += `
                    <a href="program.html?id=${item.id}" class="item">
                    ${item.title}
                    </a>
                `;
            }
        });

        html += `</div>`;
        calendar.innerHTML += html;
    }
}

function renderTVer(data) {
    const container = document.getElementById("tver-list");
    if (!container) return;

    container.innerHTML = "";

    data.forEach(item => {
        if (!item.links) return;

        item.links.forEach(link =>{
            if (link.label === "TVer") {
                const a = document.createElement("a");
                a.href = link.url;
                a.target = "_blank";
                a.className = "link-card";

                a.innerHTML = `
                    <p class="title">${item.title}</p>
                    <img src="${link.image}" alt="">
                `;

                container.appendChild(a);
            }
        });
    });
}

function filterByDate(date) {
    if (selectedDate === date) {
        selectedDate = null;
    } else {
        selectedDate = date;
    }
    renderListWithFilter();
}

function renderListWithFilter() {
    if (!selectedDate) {
        renderList(data);
        return;
    }
    const filtered = data.filter(item => item.date === selectedDate);
    renderList(filtered);
}
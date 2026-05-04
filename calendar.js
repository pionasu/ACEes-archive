let current = new Date();

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        renderCalendar(data);

        document.getElementById("prev").onclick = () => {
            current.setMonth(current.getMonth() - 1);
            renderCalendar(data);
        };

        document.getElementById("next").onclick = () => {
            current.setMonth(current.getMonth() + 1);
            renderCalendar(data);
        };
    });

function renderCalendar(data) {
    const calendar = document.getElementById("calendar");
    const monthLabel = document.getElementById("month");

    calendar.innerHTML = "";

    const year = current.getFullYear();
    const month = current.getMonth();

    monthLabel.textContent = `${year}年 ${month + 1}月`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= lastDate; day++){
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        let html = `<strong>${day}</strong>`;

        data.forEach(item =>{
            if (item.date === dateStr) {
                html += `<div class="event" onclick="location.href='detail.html?id=${item.id}'">
                    ${item.title}
                </div>`;
            }
        });

        dayDiv.innerHTML = html;
        calendar.appendChild(dayDiv);
    }
}
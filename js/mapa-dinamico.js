document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("dynamic-map");
  const container = document.getElementById("location-container");
  const calendarButton = document.getElementById("calendar-button"); // ✅ nuevo
  let mapData = {};

  fetch("https://api.sheetbest.com/sheets/66d703d0-2f2d-4788-b8a0-a2bb3a058fdd")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item, index) => {
        const button = document.createElement("div");
        button.classList.add("dates__location");
        button.dataset.location = item.name;
        container.appendChild(button);

        mapData[item.name] = {
          url: item.url,
          label: item.label,
          date: item.date,
          hours: item.hours,
        };

        button.innerHTML = `
          <strong>${item.label}</strong><br/>
          ${item.date}<br/>
          ${item.hours}
        `;

        const updateCalendarButton = (location) => {
          if (!calendarButton) return;

          const [startTime, endTime] = location.hours.split(" - ");
          const start =
            location.date.replace(/-/g, "") +
            "T" +
            startTime.replace(":", "") +
            "00";
          const end =
            location.date.replace(/-/g, "") +
            "T" +
            endTime.replace(":", "") +
            "00";

          const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            "Aris Foodtruck Event"
          )}&dates=${start}/${end}&details=${encodeURIComponent(
            "Enjoy Venezuelan food at " + location.label
          )}&location=${encodeURIComponent(location.label)}&sf=true&output=xml`;

          calendarButton.href = url;
        };

        if (index === 0) {
          button.classList.add("active");
          map.src = item.url;
          updateCalendarButton(mapData[item.name]); // ✅ inicializa el botón
        }

        button.addEventListener("click", () => {
          document
            .querySelectorAll(".dates__location")
            .forEach((el) => el.classList.remove("active"));
          button.classList.add("active");

          const key = button.dataset.location;
          map.src = mapData[key].url;
          updateCalendarButton(mapData[key]); // ✅ actualiza el botón según la dirección activa
        });
      });
    });
});

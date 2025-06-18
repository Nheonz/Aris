document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("dynamic-map");
  const labelText = document.getElementById("selected-label");
  const container = document.getElementById("location-container");
  let mapData = {};

  fetch("https://api.sheetbest.com/sheets/66d703d0-2f2d-4788-b8a0-a2bb3a058fdd")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item, index) => {
        const button = document.createElement("div");
        button.classList.add("dates__location");
        button.dataset.location = item.name;
        container.appendChild(button);

        // Guardar en mapData como objeto con url y label
        mapData[item.name] = {
          url: item.url,
          label: item.label,
        };

        // Mostrar texto
        button.innerHTML = `<strong>${item.label}</strong>`;

        // Activar el primero por defecto
        if (index === 0) {
          button.classList.add("active");
          map.src = item.url;
        }

        button.addEventListener("click", () => {
          document
            .querySelectorAll(".dates__location")
            .forEach((el) => el.classList.remove("active"));
          button.classList.add("active");

          const key = button.dataset.location;
          map.src = mapData[key].url;
          labelText.textContent = mapData[key].label; // ✅ Asegura que accedemos a la label
        });
      });
    });
});

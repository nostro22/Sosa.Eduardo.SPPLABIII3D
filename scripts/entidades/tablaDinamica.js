function crearTabla(vec, filtro) {
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "  table-bordered border-primary");
    tabla.appendChild(crearCabecera(filtro));
    tabla.appendChild(crearCuerpo(vec, filtro));

    return tabla;
}

function crearCabecera(elemento) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    tr.setAttribute("class", "cabecera");
    elemento.forEach(key => {
        if (key) {
            const th = document.createElement("th");
            th.textContent = key;
            tr.appendChild(th);
        }
    });
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(vec, filtro) {
    const tbody = document.createElement("tbody");
    for (let i = 0; i < vec.length; i++) {
        const tr = document.createElement("tr");
        tr.classList.add(i % 2 == 0 ? "colorPar" : "colorImpar");
        tr.classList.add("pointer");

        for (const key in vec[i]) {
            if (key === "id") {
                tr.setAttribute("data-id", vec[i][key]);
            }

            if (verificarParametro(filtro, key)) {
                const td = document.createElement("td");
                td.textContent = vec[i][key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    }

    return tbody;
}

export default crearTabla;

function verificarParametro(arr, val) {
    return arr.some((arrVal) => val === arrVal);
}

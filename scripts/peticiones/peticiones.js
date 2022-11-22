
const URL = "http://localhost:3000/animales";
import { getFiltro, actualizarTabla, promedio } from "../admin.js";
import imprimirAnuncios from "../entidades/anunciosDinamicos.js";
const spinnerSrc = "./assets/Running dog.gif";
const divSpinner = document.getElementById("spinner");
export let listado = [];
let filtro = getFiltro();


//GetMascotas XML

export const getMascotas = () => {
  setSpinner(divSpinner, spinnerSrc);
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        listado = data;
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      clearSpinner(divSpinner);
    }
  });
  xhr.open("GET", URL);
  xhr.send();
};

//Imprimir cartas XML

export const imprimirCardsMascotasAjax = () => {
  setSpinner(divSpinner, spinnerSrc);

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        listado=data;
        imprimirAnuncios(listado,filtro);
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      clearSpinner(divSpinner);
    }
  });
  xhr.open("GET", URL);
  xhr.send();
};

//Imprimir Tabla Axios

export const imprimirTablaAsyncAxios = async () => {
  try {
    setSpinner(divSpinner, spinnerSrc);
    const { data } = await axios(URL);
    listado = data;
    actualizarTabla(listado, filtro);
    let precios = listado.map(p => parseFloat(p.precio)).reduce((p, a) => p + a, 0);
    promedio.value = (precios / listado.length).toFixed(2);
  } catch (error) {
    console.error(error.message);
  } finally {
    clearSpinner(divSpinner);
  }
};

//Alta Anuncio XML

export function altaAnuncioMascotaXml(mascota){
  setSpinner(divSpinner, spinnerSrc);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(mascota));

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      clearSpinner(divSpinner);
    }
  });
};



////Fetch Update

export const updateObjFecth = (ObjFetch) => {
  setSpinner(divSpinner, spinnerSrc);

  fetch(URL + `/${ObjFetch.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ObjFetch),
  })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
    )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      clearSpinner(divSpinner);
    });
};

////Fetch Delete
export const deleteObjFetch = (id) => {
  console.log("Inicio");
  setSpinner(divSpinner, spinnerSrc);

  fetch(URL + `/${id}`, {
    method: "DELETE",
  })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
    )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      clearSpinner(divSpinner);
    });
};



const setSpinner = (div, src) => {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", "spinner");
  div.appendChild(img);
};

const clearSpinner = (div) => {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstElementChild);
  }
};
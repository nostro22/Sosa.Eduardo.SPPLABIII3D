import crearTabla from "./entidades/tablaDinamica.js";
import Anuncio_Mascota from "./entidades/Anuncio_Mascota.js";
import {validarCampoVacio,validarPrecio,validarLongitudMaxima} from "./entidades/validaciones.js";
import { listado, imprimirTablaAsyncAxios, altaAnuncioMascotaXml, updateObjFecth, deleteObjFetch } from "./peticiones/peticiones.js";


const $tableContainer = document.getElementById("listado");
const $form = document.forms[0] || document;
const $nav = document.getElementsByTagName("nav");
const $styleSheet = document.getElementById("style");
const $anuncio = document.querySelector(".anuncio");
const { btn_editar, btn_eliminar, btn_cancelar } = $form;
const { titulo, transaccion, descripcion, precio, raza, fecha, vacunas } = $form;
let listadoAUsar = [];
const { filtroId, filtroTitulo, filtroTransaccion, filtroDescripcion, filtroPrecio, filtroRaza, filtroFecha, filtroVacuna } = $form;
const arrayFiltros = [filtroId, filtroTitulo, filtroTransaccion, filtroDescripcion, filtroPrecio, filtroRaza, filtroFecha, filtroVacuna];
const tipo_Transacion = $form.tipo_Transacion;
export const promedio = $form.querySelector("#txt_promedio");
let filtro = ["id", "transaccion", "descripcion", "precio", "raza", "fecha", "vacuna"];
//Obtengo mis filtros y creo un array con los nombres de los mismos filtrado la palabra por ejemplo: filtroId => id
if (document.forms[0]) {
    const { filtroId, filtroTitulo, filtroTransaccion, filtroDescripcion, filtroPrecio, filtroRaza, filtroFecha, filtroVacuna } = document.forms[0];
    const arrayFiltros = [filtroId, filtroTitulo, filtroTransaccion, filtroDescripcion, filtroPrecio, filtroRaza, filtroFecha, filtroVacuna];

    if (arrayFiltros) {
        filtro = arrayFiltros.map(e => e.checked ? e.name.replace("filtro", "").toLowerCase() : false);
    }
}

let table;
let _id = -1;

export function getFiltro() {
    let filtro = ["id", "transaccion", "descripcion", "precio", "raza", "fecha", "vacuna"];
    if (document.forms[0]) {
        const { filtroId, filtroTitulo, filtroTransaccion, filtroDescripcion, filtroPrecio, filtroRaza, filtroFecha, filtroVacuna } = document.forms[0];
        const arrayFiltros = [filtroId, filtroTitulo, filtroTransaccion, filtroDescripcion, filtroPrecio, filtroRaza, filtroFecha, filtroVacuna];

        if (arrayFiltros) {
            filtro = arrayFiltros.map(e => e.checked ? e.name.replace("filtro", "").toLowerCase() : false);
        }
    }
    return filtro;
}

if (document.forms[0])
    imprimirTablaAsyncAxios();

//Actualizacion listas por Filtlros
$form.addEventListener("change", e => {
    switch (tipo_Transacion.value) {
        case "gato":
            listadoAUsar = listado.filter(e => e.transaccion == "gato");
            console.log(listadoAUsar);
            break;
        case "perro":
            listadoAUsar = listado.filter(e => e.transaccion == "perro");
            break;
        default:
            listadoAUsar = listado;
            break;
    }
    let precios = listadoAUsar.map(p => parseFloat(p.precio)).reduce((p, a) => p + a, 0);
    promedio.value = (precios / listadoAUsar.length).toFixed(2);
    filtro = arrayFiltros.map(e => e.checked ? e.name.replace("filtro", "").toLowerCase() : false);
    actualizarTabla(listadoAUsar, filtro);
});

//Evento submit del formulario
$form.addEventListener("submit", e => {
    const form = e.target;
    e.preventDefault();
    //Alta
    if (btn_editar.classList.contains("alta")) {
        if (validarEntrada(form)) {
            let nuevaMascota = new Anuncio_Mascota(null, titulo.value,
                transaccion.value, descripcion.value, precio.value,
                raza.value, fecha.value, vacunas.value);
            altaAnuncioMascotaXml(nuevaMascota);
            $anuncio.classList.add("hidden")
        } else {
            $anuncio.classList.remove("hidden")
            $anuncio.innerHTML = "Datos incompletos!";
        }
    }
    //Modificacion
    else {
        if (btn_editar.classList.contains("editar")) {
            const objeto = listado[buscarPorId(listado, _id)];
            if (objeto) {
                if (titulo.value) {
                    objeto.titulo = titulo.value;
                }
                if (transaccion.value) {
                    objeto.transaccion = transaccion.value;
                }
                if (descripcion.value) {
                    objeto.descripcion = descripcion.value;
                }
                if (parseInt(precio.value)) {
                    objeto.precio = precio.value;
                }
                if (raza.value) {
                    objeto.raza = raza.value;
                }
                if (parseInt(fecha.value)) {
                    objeto.fecha = fecha.value;
                }
                if (vacunas.value) {
                    objeto.vacuna = vacunas.value;
                }
                if (validarEntrada()) {
                    updateObjFecth(objeto);
                    filtro = arrayFiltros.map(e => e.checked ? e.name.replace("filtro", "").toLowerCase() : false);
                    unsetId();
                }
            }
        }
    }
});

$form.addEventListener("reset", e => {
    for (const iterator of $form) {
        if (iterator.classList.contains("correcto"))
            iterator.classList.remove("correcto");
    }
});

//Envento cambio en el valor de los inputs
document.addEventListener("input", e => {
    const form = e.target;
    titulo.addEventListener("blur", validarLongitudMaxima);
    transaccion[0].addEventListener("blur", validarCampoVacio);
    transaccion[1].addEventListener("blur", validarCampoVacio);
    descripcion.addEventListener("blur", validarLongitudMaxima);
    precio.addEventListener("blur", validarPrecio);
    raza.addEventListener("blur", validarCampoVacio);
    fecha.addEventListener("blur", validarCampoVacio);
    vacunas.addEventListener("blur", validarCampoVacio);
});

//Evento de click en la tabla
window.addEventListener("click", e => {
    if (e.target.matches("tr td")) {
        setId(e.target.parentElement.dataset.id);
        btn_editar.classList.replace("alta", "editar");
        document.querySelector(".editar div span").innerHTML = "Modificar";
        inicializarCampos();
    }
});

if (btn_eliminar) {
    //Evento click del boton Eliminar
    btn_eliminar.addEventListener("click", () => {
        deleteObjFetch(_id);
        unsetId();
    });
}

if (btn_cancelar) {
    //Evento click del boton
    btn_cancelar.addEventListener("click", unsetId);
}

export function actualizarTabla(vec, filtro) {

    if ($tableContainer.firstChild) {

        while ($tableContainer.firstChild) {
            $tableContainer.removeChild($tableContainer.firstChild);
        }
    }
    table = crearTabla(vec, filtro);
    $tableContainer.appendChild(table);

}

function setId(id) {
    _id = id;
    if (_id > 0) {
        btn_editar.classList.replace("alta", "editar",);
        btn_cancelar.classList.remove("hidden");
        btn_eliminar.classList.remove("hidden");
    }
}

function unsetId() {
    _id = -1;
    btn_editar.classList.replace("editar", "alta");
    btn_cancelar.classList.add("hidden");
    btn_eliminar.classList.add("hidden");
    document.querySelector(".alta div span").innerHTML = "Guardar";
}

function buscarPorId(lista, id) {
    if (lista) {
        return lista.findIndex(el => el.id == id);
    }
}

function inicializarCampos() {
    const elemento = listado[buscarPorId(listado, _id)];
    titulo.value = elemento.titulo;
    titulo.setAttribute("class", "correcto");
    elemento.transaccion == "perro" ? transaccion[0].checked = true : transaccion[1].checked = true;
    transaccion[0].setAttribute("class", "correcto");
    descripcion.value = elemento.descripcion;
    descripcion.setAttribute("class", "correcto");
    precio.value = elemento.precio;
    precio.setAttribute("class", "correcto");
    raza.value = elemento.raza;
    raza.setAttribute("class", "correcto");
    fecha.value = elemento.fecha;
    fecha.setAttribute("class", "correcto");
    vacunas.value = elemento.vacuna;
    vacunas.setAttribute("class", "correcto");
}


//Verifica que las clases tengan la clase correcto
function validarEntrada() {

    if (
        titulo.matches(".correcto") &&
        (transaccion[0].matches(".correcto") || transaccion[1].matches(".correcto")) &&
        descripcion.matches(".correcto") &&
        precio.matches(".correcto") &&
        raza.matches(".correcto") &&
        fecha.matches(".correcto") &&
        vacunas.matches(".correcto")) {
        return true;
    } else {

        return false;
    }
}



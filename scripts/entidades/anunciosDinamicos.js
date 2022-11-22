export default function imprimirAnuncios(lista) {
    if (lista != null) {
        var main = document.getElementById("anunciosDinamicos");
       
        var divCardGroup = document.createElement("div");
        divCardGroup.setAttribute("class", "row row-cols-1 row-cols-md-4 gap-4 m-0  ");
       
        for (var i = 0; i < lista.length; i++) {
            const objecto = lista[i];
            if (objecto.id != 0) {

               var divPrincipal = document.createElement("div");
                divPrincipal.setAttribute("class", "card  p-3");
    
                var innerDiv = document.createElement("div");
                innerDiv.setAttribute("class", "card-head");
                
                var innerDivTitulo = document.createElement("div");
                innerDivTitulo.setAttribute("class","card-title");
                
                var innerDivDescripcion = document.createElement("div");
                innerDivDescripcion.setAttribute("class","card-text");
                
                var innerDivPrecio = document.createElement("div");
                innerDivPrecio.setAttribute("class","card-text text-warning");

                var divCuerpo = document.createElement("div");
                divCuerpo.setAttribute("class", " d-flex card-body flex-row justify-content-center");

                var divFooter = document.createElement("div");
                divFooter.setAttribute("class", "card-footer");

                var titulo = document.createElement("h1");
                titulo.textContent = objecto.titulo + " " + objecto.transaccion;

                var descripcion = document.createElement("h3");
                descripcion.textContent = objecto.descripcion;

                var precio = document.createElement("p1");
                precio.setAttribute("class", "card-text");
                precio.textContent = "$" + objecto.precio;

                crearCarasteristica(objecto, divCuerpo, divFooter);

                innerDiv.appendChild(innerDivTitulo);
                innerDivTitulo.appendChild(titulo);
                innerDiv.appendChild(innerDivDescripcion);
                innerDivDescripcion.appendChild(descripcion);
                innerDiv.appendChild(innerDivPrecio);
                innerDivPrecio.appendChild(precio);

                divPrincipal.appendChild(innerDiv);
                divPrincipal.appendChild(divCuerpo);
                divPrincipal.appendChild(divFooter);
                divCardGroup.appendChild(divPrincipal);
            }
            main.appendChild(divCardGroup);
        }

        return true;
    }
    else{
        return false
    }
}


function crearCarasteristica(objecto, divAnuncios, divboton) {

    var div = document.createElement("div");
    div.setAttribute("class", "d-flex col-3 flex-column align-items-center")
    var i = document.createElement("i");
    i.classList.add("material-icons");
    i.innerHTML = "pets";
    var p = document.createElement("p");
    p.innerText = objecto.raza;

    var div2 = document.createElement("div");
    div2.setAttribute("class", " d-flex col-5 flex-column align-items-center ")
    var i2 = document.createElement("i");
    i2.classList.add("material-icons");
    i2.innerHTML = "cruelty_free";
    var p2 = document.createElement("p");
    p2.innerText = objecto.fecha;

    var div3 = document.createElement("div");
    div3.setAttribute("class", "d-flex col-3 flex-column align-items-center")
    var i3 = document.createElement("i");
    i3.classList.add("material-icons");
    i3.innerHTML = "vaccines";
    var p3 = document.createElement("p");
    p3.innerText = objecto.vacuna;


    var div4 = document.createElement("div");
    div4.setAttribute("class", " d-flex justify-content-center")
    var boton = document.createElement("button");
    boton.innerText="VER MASCOTAS";
    boton.setAttribute("class", "btn btn-warning")

    div.appendChild(i);
    div.appendChild(p);
    div.appendChild(boton);
    div2.appendChild(i2);
    div2.appendChild(p2);
    div2.appendChild(boton);
    div3.appendChild(i3);
    div3.appendChild(p3);
    div4.appendChild(boton);

    divAnuncios.appendChild(div);
    divAnuncios.appendChild(div2);
    divAnuncios.appendChild(div3);
    divboton.appendChild(div4);

}


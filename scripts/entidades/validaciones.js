export const validarCampoVacio = (e) => {
    const input = e.target;
    input.value.trim() ? clearError(input) : setError(input, "Campo requerido");
};

export const validarLongitudMaxima = (e)=>{
    const input = e.target;
    if(e.target.value)
    {
        input.value.trim().length<25? clearError(input) : setError(input, "Longitud maxima de 25 excedida");
        
    }
    else{
        setError(input, "Campo requerido");
    }
}

export const validarPrecio = (e) => {    
    const input = parseFloat( e.target.value);

    if (input>=0 && input<5001 && input!=isNaN ) {
        clearError(e.target); 
    }
    else{
        setError(e.target, "precio Invalido 0-5000 premitido");
    }
}

const setError = (input, mensaje) => {
    const $small = input.nextElementSibling;
    $small.textContent = mensaje || `${input.name} requerido`;
    input.classList.remove("correcto");
    input.classList.add("inputError");
    $small.classList.add("danger");
};
const clearError = (input, mensaje) => {
    const $small = input.nextElementSibling;
    input.classList.add("correcto");
    $small.textContent = "";
    input.classList.remove("inputError");
    $small.classList.remove("danger");
};

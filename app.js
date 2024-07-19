document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el botón por su clase
    var botones = document.getElementsByClassName("button");

    // Agrega un evento de clic a cada botón
    for (var i = 0; i < botones.length; i++) {
        var botonTexto = botones[i].textContent.trim();
        if (botonTexto === "Encriptar") {
            botones[i].addEventListener("click", function(event) {
                event.preventDefault(); // Evita que el enlace recargue la página
                eliminarElementos();
                guardarElemento(true); // true indica que queremos encriptar
            });
        } else if (botonTexto === "Desencriptar") {
            botones[i].addEventListener("click", function(event) {
                event.preventDefault(); // Evita que el enlace recargue la página
                eliminarElementos();
                guardarElemento(false); // false indica que queremos desencriptar
            });
        }
    }
});

// Función para eliminar todos los elementos dentro del aside
function eliminarElementos() {
    var aside = document.getElementById("aside");
    while (aside.firstChild) {
        aside.removeChild(aside.firstChild);
    }
}

function guardarElemento(encryptar) {
    var texto = document.querySelector("#textarea").value;
    var aside = document.querySelector("#aside");
    var nuevoText = document.createElement("p");
    nuevoText.classList.add("encrypt");

    if (encryptar) {
        // Encriptar el texto
        var cifrado = encriptarTexto(texto);
        nuevoText.textContent = cifrado;
    } else {
        // Desencriptar el texto
        var textoDesencriptado = desencriptarTexto(texto);
        nuevoText.textContent = textoDesencriptado;
    }

    aside.appendChild(nuevoText);
}

function encriptarTexto(texto) {
    const key = "clave-secreta";
    const cifrado = CryptoJS.AES.encrypt(texto, key).toString();
    return cifrado;
}

function desencriptarTexto(cifrado) {
    const key = "clave-secreta";
    const bytes = CryptoJS.AES.decrypt(cifrado, key);
    const textoDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return textoDesencriptado;
}

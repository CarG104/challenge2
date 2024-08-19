document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el botón por su clase
    var botones = document.getElementsByClassName("button");
    


    // Agrega un evento de clic a cada botón
    for (var i = 0; i < botones.length; i++) {
        var botonTexto = botones[i].textContent.trim();
        if (botonTexto === "Encriptar") {
            botones[i].addEventListener("click", function(event) {
                event.preventDefault(); // Evita que el enlace recargue la página
                var texto = document.querySelector("#textarea").value;
                if (validarTexto(texto)) {
                    eliminarElementos();
                    guardarElemento(true);// true indica que queremos encriptar
                }
            });
        } else if (botonTexto === "Desencriptar") {
            botones[i].addEventListener("click", function(event) {
                event.preventDefault(); // Evita que el enlace recargue la página
                var texto = document.querySelector("#textarea").value; // Asegúrate de definir 'texto' aquí
                if (validarTexto(texto)) {
                    eliminarElementos();
                    guardarElemento(false);// false indica que queremos desencriptar
                }
            });
        }
    }
      // Agrega el evento de copiar al portapapeles
      document.getElementById("aside").addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("buttonCopy")) {
            copiarAlPortapapeles(event.target.previousElementSibling.textContent);
        }
    });
});
document.querySelector("#textarea").addEventListener("input", function() {
    var texto = this.value;
    validarTexto(texto);
});
 // Función para validar el texto
 function validarTexto(texto) {
    var textoMinusculas = texto.toLowerCase();
    var textoSinAcentos = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (texto !== textoMinusculas || texto !== textoSinAcentos) {
        alert("Por favor, ingrese solo letras minúsculas sin acentos.");
        document.querySelector("#btnEncriptar").disabled = true;
        document.querySelector("#btnDesencriptar").disabled = true;
        return false;
    } else {
        document.querySelector("#btnEncriptar").disabled = false;
        document.querySelector("#btnDesencriptar").disabled = false;
        return true;
    }
}

// Función para eliminar todos los elementos dentro del aside
function eliminarElementos() {
    var aside = document.getElementById("aside");
    while (aside.firstChild) {
        aside.removeChild(aside.firstChild);
    }
}

function guardarElemento(encryptar) {
    var texto = document.querySelector("#textarea").value;
    console.log("Textarea valor: "+texto)
    var aside = document.querySelector("#aside");
    var nuevoText = document.createElement("p");
    nuevoText.classList.add("encrypt");
    var buttonCopy = document.createElement("button");
    buttonCopy.classList.add("buttonCopy");
    buttonCopy.textContent = "Copiar"; // Añadir texto al botón

    if (encryptar) {
        // Encriptar el texto
        var cifrado = encriptarTexto(texto);
        nuevoText.textContent = cifrado;
        console.log("texto cifrado en el condicional de la funcion guardar elemento: "+cifrado);
    } else {
        // Desencriptar el texto
        var textoDesencriptado = desencriptarTexto(texto);
        nuevoText.textContent = textoDesencriptado;
   
    }
    

    console.log("texto para probar si guardar elemento funciona: "+nuevoText.textContent)
    aside.appendChild(nuevoText);
    aside.appendChild(buttonCopy);
}

function encriptarTexto(texto) {
    let reemplazos = {
        "o": "ober",
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "u": "ufat"
    };
    const cifrado = texto.replace(/[oaieu]/g, function(matched) {
        return reemplazos[matched];
    });
    console.log("Texto de depuracion de la funcion encriptarTexto: "+cifrado)
    return cifrado;
}

function desencriptarTexto(texto) {
    let reemplazos2 = {
        "ober": "o",
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ufat": "u"
    };
    const textoDesencriptado = texto.replace(/ober|ai|imes|enter|ufat/g, function(matched) {
        return reemplazos2[matched];
    });
    console.log("Texto de depuracion de la funcion encriptarTexto: " +textoDesencriptado);
    return textoDesencriptado;
}
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        alert("Texto copiado al portapapeles!");
    }).catch(function(err) {
        console.error("Error al copiar el texto: ", err);
    });
}

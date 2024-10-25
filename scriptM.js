function mostrarModal(mensaje, elemento = null) {
    document.getElementById("mensajeError").innerText = mensaje;
    document.getElementById("modalError").style.display = "flex";

    if (elemento) {
        // Resaltar el campo problemático
        elemento.style.border = "2px solid red";

        // Desplazar la página hacia el elemento
        elemento.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function cerrarModal() {
    document.getElementById("modalError").style.display = "none";

    // Quitar el resaltado del campo
    let elementosConError = document.querySelectorAll(".error");
    elementosConError.forEach(elemento => {
        elemento.style.border = "";
        elemento.classList.remove("error");
    });
}

function verificarPreguntasCompletas() {
    // Verificar si todas las preguntas están respondidas
    let preguntasIncompletas = [];
    
    // Verificar los campos de tipo radio
    let radios = document.querySelectorAll('input[type="radio"]');
    let gruposRadio = {};

    radios.forEach(radio => {
        if (!gruposRadio[radio.name]) {
            gruposRadio[radio.name] = false;
        }
        if (radio.checked) {
            gruposRadio[radio.name] = true;
        }
    });

    for (let grupo in gruposRadio) {
        if (!gruposRadio[grupo]) {
            preguntasIncompletas.push(document.querySelector(`input[name="${grupo}"]`).closest('fieldset'));
        }
    }

    // Verificar los campos de tipo select
    let selects = document.querySelectorAll('select');
    selects.forEach(select => {
        if (select.value === "") {
            preguntasIncompletas.push(select);
        }
    });

    if (preguntasIncompletas.length > 0) {
        mostrarModal("Por favor, responda todas las preguntas obligatorias.", preguntasIncompletas[0]);
        return false;
    }

    return true;
}

function calcularPuntaje() {
    if (!verificarPreguntasCompletas()) {
        return; // Detener la ejecución si hay preguntas sin responder
    }

    let puntajeTotal = 0;

    // Dimensión 1: Analfabetismo (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="leerEscribir"]:checked').value || 0);

    // Dimensión 2: Asistencia Escolar (Nivel Educativo) (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="nivelEducativo"]:checked').value || 0);

    // Dimensión 3: Asistencia Escolar (Hijos) (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="asistenEscuela"]:checked').value || 0);

    // Dimensión 4: Rezago Escolar (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="nivelRezago"]:checked').value || 0);

    // Dimensión 5: Acceso a Servicios para el Cuidado de la Primera Infancia (4 preguntas)
    let dim5a = parseFloat(document.querySelector('input[name="dim5a"]:checked').value || 0);
    let dim5b = parseFloat(document.querySelector('input[name="dim5b"]:checked').value || 0);
    let dim5c = parseFloat(document.querySelector('input[name="dim5c"]:checked').value || 0);
    let dim5d = parseFloat(document.querySelector('input[name="dim5d"]:checked').value || 0);
    let dim5Total = (dim5a + dim5b + dim5c + dim5d) / 4;
    puntajeTotal += (dim5Total > 0.5) ? 1 : 0;

    // Dimensión 6: Trabajo Infantil (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="trabajoInfantil"]:checked').value || 0);

    // Dimensión 7: Ocupación Informal (4 preguntas)
    let dim7a = parseInt(document.querySelector('#numPersonasLaboran').value || 0);
    let dim7b = parseInt(document.querySelector('#numPersonasPension').value || 0);
    let dim7c = parseFloat(document.querySelector('input[name="aportesEmpresa"]:checked').value || 0);
    let dim7d = parseFloat(document.querySelector('input[name="aportesFondoPension"]:checked').value || 0);

    // Verificar si el número de pensiones es mayor que el número de personas que laboran
    if (dim7b > dim7a) {
        let campoError = document.querySelector('#numPersonasPension');
        mostrarModal("El número de personas con pensión (" + dim7b + ") no puede ser mayor que el número de personas que laboran (" + dim7a + "). Por favor, corrija este error.", campoError);
        return; // Detener la ejecución si hay un error
    }

    // Calcular el puntaje para la dimensión 7
    let dim7Total = (dim7c + dim7d) / 2;
    if (dim7a !== dim7b) {
        dim7Total = 1; // Si el número de personas que laboran es diferente al número de pensiones, asignar 1 punto
    }
    puntajeTotal += (dim7Total > 0.5) ? 1 : 0;

    // Dimensión 8: Desempleo de larga duración (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('#tiempoBuscandoEmpleo').value || 0);

    // Dimensión 9: Aseguramiento en salud (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="aseguramientoSalud"]:checked').value || 0);

    // Dimensión 10: Acceso a servicio de salud dada una necesidad (2 preguntas)
    let dim10a = parseFloat(document.querySelector('input[name="problemaSalud"]:checked').value || 0);
    let dim10b = parseFloat(document.querySelector('input[name="acudioMedico"]:checked').value || 0);
    let dim10Total = (dim10a + dim10b) / 2;
    puntajeTotal += (dim10Total > 0.5) ? 1 : 0;

    // Dimensión 11: Acceso a fuente de agua mejorada (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="accesoAguaMejorada"]:checked').value || 0);

    // Dimensión 12: Eliminación de excretas (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="alcantarillado"]:checked').value || 0);

    // Dimensión 13: Hacinamiento crítico (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="hacinamiento"]:checked').value || 0);

    // Dimensión 14: Pisos inadecuados (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="materialPisos"]:checked').value || 0);

    // Dimensión 15: Paredes exteriores inadecuadas (1 pregunta)
    puntajeTotal += parseFloat(document.querySelector('input[name="materialParedes"]:checked').value || 0);


    // Redirigir a la página correspondiente según el puntaje total
    if (puntajeTotal < 5) {
        window.location.href = "P_Oculta.html";
    } else {
        window.location.href = "PobreM.html";
    }
}

    


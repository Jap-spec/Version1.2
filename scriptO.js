document.getElementById('pobreza-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener respuestas del formulario
  const form = event.target;
  const respuestas = {
    salarioMinimo: parseFloat(form.elements.salarioMinimo.value.replace(/\./g, '').replace(',', '.')),
    ingresoMensual: parseFloat(form.elements.ingresoMensual.value.replace(/\./g, '').replace(',', '.')),
    numPersonas: parseInt(form.elements.numPersonas.value.replace(/\./g, '').replace(',', '.')),
    fuenteIngresos: parseInt(form.elements.fuenteIngresos.value),
    calidadEmpleo: parseInt(form.elements.calidadEmpleo.value),
    cuidadoPersonas: parseInt(form.elements.cuidadoPersonas.value),
    ingresos2: parseFloat(form.elements.ingresos2.value.replace(/\./g, '').replace(',', '.')),
    planificacionAhorros: parseInt(form.elements.planificacionAhorros.value),
    inseguridadAlimentaria: parseInt(form.elements.inseguridadAlimentaria.value),
    personasVivienda: parseInt(form.elements.personasVivienda.value.replace(/\./g, '').replace(',', '.')),
    deficitHabitacional: parseInt(form.elements.deficitHabitacional.value)
  };

  // Dimensión 1: Ingresos monetarios
  const valorReferencia = respuestas.salarioMinimo * 0.3253746;
  const ingresoTotalPorPersona = (respuestas.ingresoMensual + valorReferencia) / respuestas.numPersonas;
  const puntosDimension1 = ingresoTotalPorPersona <= valorReferencia ? 1 : 0;

  // Dimensión 2: Persona mayor sin fuente de ingresos
  const puntosDimension2 = respuestas.fuenteIngresos === 0 ? 1 : 0;

  // Dimensión 3: Calidad del empleo
  let puntosDimension3 = 0;
  if (respuestas.calidadEmpleo === 1) {
    const subPuntosCalidadEmpleo = [
      parseInt(form.elements.preguntaA?.value || 0),
      parseInt(form.elements.preguntaB?.value || 0),
      parseInt(form.elements.preguntaC?.value || 0),
      parseInt(form.elements.preguntaD?.value || 0)
    ];
    const totalSubPuntos = subPuntosCalidadEmpleo.reduce((acc, punto) => acc + punto, 0) / subPuntosCalidadEmpleo.length;
    puntosDimension3 = totalSubPuntos >= 0.5 ? 1 : 0;
  } else if (respuestas.calidadEmpleo === 0) {
    const subPuntosCalidadEmpleoNo = [
      parseInt(form.elements.preguntaF?.value || 0),
      parseInt(form.elements.preguntaG?.value || 0),
      parseInt(form.elements.preguntaH?.value || 0),
      parseInt(form.elements.preguntaI?.value || 0),
      parseInt(form.elements.preguntaJ?.value || 0),
      parseInt(form.elements.preguntaK?.value || 0),
      parseInt(form.elements.preguntaL?.value || 0),
      parseInt(form.elements.preguntaM?.value || 0)
    ];
    const totalSubPuntosNo = subPuntosCalidadEmpleoNo.reduce((acc, punto) => acc + punto, 0) / subPuntosCalidadEmpleoNo.length;
    puntosDimension3 = totalSubPuntosNo >= 0.5 ? 1 : 0;
  }

  // Dimensión 4: Cuidado de otras personas del hogar
  const puntosDimension4 = respuestas.cuidadoPersonas;

  // Dimensión 5: Planificación financiera y ahorros
  const puntosDimension5 = (respuestas.ingresos2 < 500000 || respuestas.planificacionAhorros === 1) ? 1 : 0;

  // Dimensión 6: Inseguridad alimentaria
  let puntosDimension6 = 0;
  if (respuestas.inseguridadAlimentaria === 1) {
    const subPuntosInseguridadAlimentaria = [
      parseInt(form.elements.pregunta_A?.value || 0),
      parseInt(form.elements.pregunta_B?.value || 0),
      parseInt(form.elements.pregunta_C?.value || 0),
      parseInt(form.elements.pregunta_D?.value || 0),
      parseInt(form.elements.pregunta_E?.value || 0),
      parseInt(form.elements.pregunta_F?.value || 0),
      parseInt(form.elements.pregunta_G?.value || 0),
      parseInt(form.elements.pregunta_H?.value || 0),
      parseInt(form.elements.pregunta_I?.value || 0)
    ];
    const totalSubPuntosInseguridad = subPuntosInseguridadAlimentaria.reduce((acc, punto) => acc + punto, 0) / subPuntosInseguridadAlimentaria.length;
    puntosDimension6 = totalSubPuntosInseguridad >= 0.5 ? 1 : 0;
  }

  // Dimensión 7: Déficit habitacional
  const puntosDimension7 = (respuestas.personasVivienda > 3 || respuestas.deficitHabitacional === 1) ? 1 : 0;

  // Sumar los puntos de todas las dimensiones
  const totalPuntos = puntosDimension1 + puntosDimension2 + puntosDimension3 + puntosDimension4 + puntosDimension5 + puntosDimension6 + puntosDimension7;

  // Redirigir según el total de puntos
  if (totalPuntos < 2) {
    window.location.href = "SinPoculto.html";
  } else {
    window.location.href = "PobreO.html";
  }
});

function mostrarPreguntasCalidadEmpleo(select) {
  const divPreguntasCalidadEmpleo = document.getElementById('preguntas-calidad-empleo');
  const divPreguntasSiCalidadEmpleo = document.getElementById('preguntas-si-calidad-empleo');
  const divPreguntasNoCalidadEmpleo = document.getElementById('preguntas-no-calidad-empleo');
  if (select.value === '1') {
    divPreguntasCalidadEmpleo.style.display = 'block';
    divPreguntasSiCalidadEmpleo.style.display = 'block';
    divPreguntasNoCalidadEmpleo.style.display = 'none';
  } else if (select.value === '0') {
    divPreguntasCalidadEmpleo.style.display = 'block';
    divPreguntasSiCalidadEmpleo.style.display = 'none';
    divPreguntasNoCalidadEmpleo.style.display = 'block';
  } else {
    divPreguntasCalidadEmpleo.style.display = 'none';
    divPreguntasSiCalidadEmpleo.style.display = 'none';
    divPreguntasNoCalidadEmpleo.style.display = 'none';
  }
}

function mostrarPreguntasInseguridadAlimentaria(select) {
  const divPreguntasInseguridadAlimentaria = document.getElementById('preguntas-inseguridad-alimentaria');
  if (select.value === '1') {
    divPreguntasInseguridadAlimentaria.style.display = 'block';
  } else {
    divPreguntasInseguridadAlimentaria.style.display = 'none';
  }
}
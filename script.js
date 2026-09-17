document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formReclutamiento");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Detiene el envío predeterminado para procesar con JS
    validarFormulario();
  });
});

function validarFormulario() {
  const errores = [];

  // Obtenemos los valores ingresados como texto
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefonoTexto = document.getElementById("telefono").value.trim();
  const cpTexto = document.getElementById("codigo_postal").value.trim();
  const comentarios = document.getElementById("comentarios").value.trim();

  // 1. REQUISITO: Todos los campos de texto llenados

  if (nombre === "") {
    errores.push('• El campo "Nombre / Gamertag" es obligatorio.');
  }
  if (email === "") {
    errores.push('• El campo "Correo electrónico" es obligatorio.');
  }
  if (telefonoTexto === "") {
    errores.push('• El campo "Número de teléfono" es obligatorio.');
  }
  if (cpTexto === "") {
    errores.push('• El campo "Código postal" es obligatorio.');
  }
  if (comentarios === "") {
    errores.push('• El campo "Comentarios" es obligatorio.');
  }

  // 2. REQUISITO: Formato de correo electrónico
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email !== "" && !regexEmail.test(email)) {
    errores.push(
      "• El Correo electrónico no tiene un formato válido (ejemplo: usuario@unsc.com).",
    );
  }

  // 3. REQUISITO: Conversión y comprobación numérica (Teléfono)
  if (telefonoTexto !== "") {
    // Conversión a tipo numérico con Number()
    const telefonoNumero = Number(telefonoTexto);

    // Comprobamos si la conversión resultó en NaN o si contiene letras/símbolos
    if (isNaN(telefonoNumero) || !/^\d+$/.test(telefonoTexto)) {
      errores.push(
        "• El Teléfono debe contener únicamente caracteres numéricos.",
      );
    }
  }

  // 4. REQUISITO: Conversión y comprobación numérica (Código Postal)
  if (cpTexto !== "") {
    // Conversión a tipo numérico con Number()
    const cpNumero = Number(cpTexto);

    // Comprobamos si la conversión resultó en NaN o si contiene letras/símbolos
    if (isNaN(cpNumero) || !/^\d+$/.test(cpTexto)) {
      errores.push(
        "• El Código postal debe contener únicamente caracteres numéricos.",
      );
    }
  }

  // 5. REQUISITO: Validar Radio Button y Checkbox seleccionados
  const radioSeleccionado = document.querySelector(
    'input[name="jugado_halo"]:checked',
  );
  if (!radioSeleccionado) {
    errores.push(
      '• Debe seleccionar una opción en "¿Has jugado alguna vez a la saga Halo?".',
    );
  }

  const checkboxesSeleccionados = document.querySelectorAll(
    'input[name="juegos"]:checked',
  );
  if (checkboxesSeleccionados.length === 0) {
    errores.push(
      "• Debe seleccionar al menos un juego en la lista de checkboxes.",
    );
  }

  // 6. REQUISITO: Mostrar mensaje de alerta según resultado
  if (errores.length > 0) {
    // Alerta de atención con la lista de campos que requieren corregirse
    const mensajeAlerta =
      "ATENCIÓN: Se encontraron los siguientes errores en el formulario:\n\n" +
      errores.join("\n");
    alert(mensajeAlerta);
  } else {
    // Si la comprobación numérica fue exitosa, podemos parsear con parseInt
    const telefonoNumFinal = parseInt(telefonoTexto, 10);
    const cpNumFinal = parseInt(cpTexto, 10);

    // Alerta de éxito
    const mensajeExito = `¡TRANSMISIÓN EXITOSA DE DATOS!

Tus datos han sido validados correctamente:
- Gamertag: ${nombre}
- Correo: ${email}
- Teléfono (valor numérico): ${telefonoNumFinal}
- C.P. (valor numérico): ${cpNumFinal}
- Facción elegida: ${document.getElementById("faccion").value}`;

    alert(mensajeExito);

    // Limpia el formulario
    document.getElementById("formReclutamiento").reset();
  }
}

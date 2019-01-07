$(document).ready(function () {

	var aleatorio = crearNum();
	var intentetos = 1;
	
	console.log(aleatorio);

	$("#valor").keypress(function (evt) {

		var key = evt.keyCode || evt.charCode;
		var numero = $("#valor").val();
		var numeroIngresado = key - 48;

		// Validar que el numero digitado no se repita con los ya ingresados
		if (!validarNumRepetido(numero, numeroIngresado)) {
			evt.preventDefault();
		}

		// Validar que el numero digitado no sea mayor a 4 cifras
		if ($("#valor").val().length >= 4) {
			evt.preventDefault();
		}

		// Evitar que no se presionen letras
		if (evt.which < 48 || evt.which > 57) {
			evt.preventDefault();
		}

		// Al momento de presionar Enter
		if (evt.keyCode == 13) {
			var longitudNumero = $("#valor").val().length;
			if (numero == '') {
				alert("Ingrese un número");
			} else if (longitudNumero < 4) {
				alert("Ingrese un número de 4 Digitos");
			} else {
				puntos = comprobarPuntuacion(aleatorio, $("#valor").val());
				$("#tablaPuntuacion").append("<tr><td>" + $("#valor").val() + "</td><td>" + puntos.picas + "</td><td>" + puntos.fijas + "</td></tr>");
				$("#valor").val("");

				if (puntos.fijas == 4) {
					alert("Felicidades! ha adivinado el número");
					window.location = document.URL;
				}
			}
		}
	});
});

function validarNumRepetido(num1, num2) {
	if (num1.indexOf(num2) < 0) {
		return true;
	} else {
		return false;
	}
}

function crearNum() {
	var numGenerado = Array();
	while (numGenerado.length < 4) {
		var num2 = parseInt(Math.random() * 10);
		if (validarNumRepetido(numGenerado, num2)) {
			numGenerado.push(num2);
		}
	}
	return numGenerado.join("");
}

function comprobarPuntuacion(numGenerado, numero) {
	var picas = 0;
	var fijas = 0;
	for (var x in numero) {
		var posicion = numGenerado.indexOf(numero[x]);
		if (posicion >= 0) {
			if (posicion == x) {
				fijas++;
			} else {
				picas++;
			}
		}
	}
	return {
		"picas": picas,
		"fijas": fijas
	};
}
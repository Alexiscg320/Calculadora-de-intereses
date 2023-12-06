
function calcularPrestamo() {
  let monto = parseInt(prompt("Ingrese el monto del prestamo (100, 200, 500):"));
  let cuotas = parseInt(prompt("Seleccione la cantidad de cuotas (3, 6, 12):"));
  let porcentaje;

  if ((monto === 100 || monto === 200 || monto === 500) && (cuotas === 3 || cuotas === 6 || cuotas === 12)) {
    if (cuotas === 3) {
      porcentaje = 5;
    } else if (cuotas === 6) {
      porcentaje = 15;
    } else if (cuotas === 12) {
      porcentaje = 30;
    }

    let interes = (monto * porcentaje) / 100;
    let totalConInteres = monto + interes;

    console.log("Monto solicitado: $" + monto);
    console.log("Cuotas: $" + cuotas);
    console.log("Porcentaje de interés: $" + porcentaje);
    console.log("Interés total: $"+ interes);
    console.log("Total a pagar: $" + totalConInteres);
  } else {
    console.log("Por favor, ingrese un monto y cuotas válidos.");
  }
}

let repetir;

do {
  calcularPrestamo();
  repetir = prompt("Desea calcular otro prestamo? (si/no)").toLowerCase();
} while (repetir === 'si');
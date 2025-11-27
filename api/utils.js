import fs from "fs";
import { parse } from "csv-parse/sync";

// ==============================
// Cargar CSV con predicciones 2025
// ==============================
export function cargarCSV() {
  const contenido = fs.readFileSync("./predicciones_2025.csv", "utf8");

  const rows = parse(contenido, {
    columns: true,
    skip_empty_lines: true
  });

  const mapa = {};
  rows.forEach(r => {
    mapa[r.MES.toLowerCase()] = parseFloat(r.PREDICCION);
  });

  return mapa;
}

// ==============================
// Obtener E_mes desde CSV
// ==============================
export function obtenerEmes(mes) {
  const csv = cargarCSV();
  return csv[mes.toLowerCase()] || 0;
}

// ==============================
// Pesos diarios
// ==============================
export function calcularEdiario(E_mes, fecha) {
  const f = new Date(fecha);
  const year = f.getFullYear();
  const month = f.getMonth(); // 0–11
  const day = f.getDate();

  // Cantidad de dias del mes
  const last = new Date(year, month + 1, 0).getDate();

  let pesos = [];

  for (let d = 1; d <= last; d++) {
    let peso = 1;
    const dow = new Date(year, month, d).getDay(); // 0=domingo

    if (dow === 0 || dow === 6) peso += 1;
    if (d <= 5) peso += 0.5;
    if (d >= 25) peso += 0.3;

    pesos.push(peso);
  }

  const total = pesos.reduce((a, b) => a + b, 0);
  const p = pesos[day - 1] / total;

  return Math.round(E_mes * p);
}

// ==============================
// Pesos horarios
// ==============================
export function distribucionHoraria(E_dia) {
  const horas = Array.from({ length: 24 }, (_, h) => h);
  const PESOS = horas.map(h =>
    h < 6 ? 0.5 :
    h < 12 ? 1.5 :
    h < 19 ? 2.5 :
             1.0
  );

  const total = PESOS.reduce((a,b) => a+b, 0);

  return horas.map((h, i) => ({
    hora: h,
    pred_hora: Math.round(E_dia * (PESOS[i] / total))
  }));
}

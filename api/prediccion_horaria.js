import { obtenerEmes, calcularEdiario, distribucionHoraria } from "./utils.js";

const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

export default (req, res) => {
  const fecha = req.query.fecha; // YYYY-MM-DD

  const f = new Date(fecha);
  const mes = MESES[f.getMonth()];

  const E_mes = obtenerEmes(mes);
  const E_dia = calcularEdiario(E_mes, fecha);
  const horas = distribucionHoraria(E_dia);

  res.json({
    fecha,
    mes,
    E_mes,
    E_dia,
    horas
  });
};

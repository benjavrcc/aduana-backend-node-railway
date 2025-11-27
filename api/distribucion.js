import { distribucionHoraria } from "./utils.js";

global.registros = global.registros || [];

export default (req, res) => {
  const esperado = req.body.esperado;

  if (!esperado) {
    return res.status(400).json({ error: "Falta parámetro esperado" });
  }

  const horas = distribucionHoraria(esperado);
  res.json(horas);
};

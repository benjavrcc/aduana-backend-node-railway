global.registros = global.registros || [];

export default (req, res) => {
  const { fecha_llegada, hora_llegada, cantidad_viajeros } = req.body;

  global.registros.push({
    fecha_llegada,
    hora_llegada,
    cantidad_viajeros
  });

  res.json({ ok: true, total: global.registros.length });
};

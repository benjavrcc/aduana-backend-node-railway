global.registros = global.registros || [];

export default (req, res) => {
  res.json({
    total_registros: global.registros.length,
    registros: global.registros
  });
};

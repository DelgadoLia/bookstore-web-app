//al insertar
const validarProducto = (req, res, next) => {
  const { nombre, precio, stock, categoria } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
  }

  if (!categoria || categoria.trim() === '') {
    return res.status(400).json({ error: 'La categoría es obligatoria' });
  }


  if (precio === undefined || precio === '') {
    return res.status(400).json({ error: 'El precio es obligatorio' });
  }

  const precioNum = parseFloat(precio);
  if (isNaN(precioNum) || precioNum <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
  }

  if (stock === undefined || stock === '') {
    return res.status(400).json({ error: 'El stock es obligatorio' });
  }

  const stockNum = parseInt(stock);
  if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
    return res.status(400).json({ error: 'El stock debe ser un número entero mayor o igual a 0' });
  }

  next();
};

module.exports = validarProducto;
const validarMensaje = (req, res, next) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  if (!asunto || asunto.trim() === '') {
    return res.status(400).json({ error: 'El asunto es obligatorio' });
  }

  if (!correo || correo.trim() === '') {
    return res.status(400).json({ error: 'El correo es obligatorio' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: 'El correo no tiene un formato válido' });
  }

  if (!mensaje || mensaje.trim() === '') {
    return res.status(400).json({ error: 'El mensaje es obligatorio' });
  }

  if (mensaje.trim().length < 10) {
    return res.status(400).json({ error: 'El mensaje debe tener al menos 10 caracteres' });
  }

  next();
};

module.exports = validarMensaje;
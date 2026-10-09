const jwt = require('jsonwebtoken');

const protegerRuta = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'No autorizado, token faltante' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

// Middleware para autorizar por sector (ej: 'Gerencia')
const autorizarSector = (...sectoresPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ mensaje: 'No autorizado, usuario no autenticado' });
        }
        if (!sectoresPermitidos.includes(req.usuario.sector)) {
            return res.status(403).json({ 
                mensaje: `Acceso denegado: acción exclusiva para el sector ${sectoresPermitidos.join(' o ')}` 
            });
        }
        next();
    };
};

module.exports = { protegerRuta, autorizarSector };
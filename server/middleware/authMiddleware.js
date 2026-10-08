const token = require('jsonwebtoken');

const protegerRuta = (req, res, next) => {
   
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'No autorizado, token faltante' });
    }

    const token = authHeader.split(' ')[1];

    try {
         const decoded = token.verify(token, process.env.JWT_SECRET || 'palabra_secreta_temporal');
        
         req.usuario = decoded; 
        
        next(); 
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = { protegerRuta };
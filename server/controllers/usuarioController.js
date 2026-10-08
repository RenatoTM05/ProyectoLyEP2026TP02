const usuarioService=require('../services/usuarioService');

const registrarUsuario= async (req,res) =>{
    try{
        const usuarioACrear= await usuarioService.CrearUsuario(req.body);
        res.status(202).json(usuarioACrear);
    }catch(error){
        res.status(404).json({
            mensaje:'error al crear un usuario'
        })
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { token, usuario } = await usuarioService.loginUsuario(email, password)
    res.status(200).json({ token, usuario }) 
  } catch (error) {
    res.status(401).json({ mensaje: error.message })
  }
}

const deleteUser=async(req,res)=>{
    try{
        const {id}=req.params;
        await usuarioService.eliminarUsuario(id);
        res.status(200).json({mensaje: 'Usuario Eliminado'})

    }catch(error){
        res.status(404).json({
            mensaje:error.message});
        
    }
}
const listarUsuarios = async (req, res) => {
  try {
    const Usuario = require('../models/Usuario')
    const usuarios = await Usuario.find({}, '-password') // sin password
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports ={
    registrarUsuario,
    login,
    deleteUser,
    listarUsuarios
    
};
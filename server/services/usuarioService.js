const usuarioModel=require('../models/Usuario');
 const encriptar=require('bcryptjs');
 const tokencillo=require('jsonwebtoken');

const CrearUsuario= async (bodyUsuario) =>{
    const {email,password,nombre,sector}=bodyUsuario;
   const usuarioExistente=await usuarioModel.findOne({email});
   if(usuarioExistente){
    throw new Error('El Email ya está registrado');
   }
   const saltoEncriptacion=await encriptar.genSalt(10);
   const passwordHasheo= await encriptar.hash(password,saltoEncriptacion);
    
   const nuevoUsuario= new usuarioModel({
    email, password:passwordHasheo, nombre,sector
   }
   )
    return await nuevoUsuario.save();
}

const loginUsuario= async (email,password) => {
    const usuario= await usuarioModel.findOne({email});
    if(!usuario){
        throw new Error('el usuario no existe')
    }

    const passwordValido= await encriptar.compare(password,usuario.password);
    if(!passwordValido){
        throw new Error('Contraseña del usuario incorrecta');
    }

    const tokenUsuario= tokencillo.sign(
        {id:usuario._id,sector:usuario.sector},
        process.env.JWT_SECRET || 'tokencillo_temporal',
        {expiresIn:'2h'}
    )
    return {token,usuario}
}

const eliminarUsuario=async(id)=>{
const usuario=await usuarioModel.findById(id);
if(!usuario){
    throw new Error('Usuario No Encontrado')
}
return await usuarioModel.findByIdAndDelete;
}

module.exports={
    CrearUsuario,
    eliminarUsuario,
    loginUsuario
}
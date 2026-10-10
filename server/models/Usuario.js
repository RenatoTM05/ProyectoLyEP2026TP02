const mongoose= require('mongoose');
const usuarioSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true, match: /.+@.+..+/ } ,
    password:{type:String,required:true,minlength: 6},
    nombre:{type:String,required:true},
    sector:{type:String,required:true} 
},{
    timestamps:true,
    toJSON:{
        transform: (document,returnedObject) =>
        {
            returnedObject.id = returnedObject._id.toString();
           delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.password
        }
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema);


module.exports=Usuario;
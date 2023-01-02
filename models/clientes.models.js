const { Schema, model} = require ('mongoose');

const ClienteSchema = Schema({
  
    nombre:{
       type:String,
       required:true 
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    telefono:{
        type: String,
        required:true

    },
    usuario :{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true 
    },
    clinica :{
        type: Schema.Types.ObjectId,
        ref: 'Clinica',
        required:true 
    },

},{ collection: 'clientes'});
// ESTA FUNCIÓN EXTRAE DEL OBJETO LA INFORMACIÓN QUE DESEA QUE NO SEA VISIBLE.OJO
ClienteSchema.method('toJSON', function() {
    //>
    const { __v, ...object} = this.toObject();
    //*******================> */
    return object;
})

module.exports = model('Cliente', ClienteSchema );
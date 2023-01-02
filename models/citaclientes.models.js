

const { Schema, model } = require ('mongoose');

 const CitaSchema = Schema({
 
    fechacita: {
     type: Date,
     required:true

    }, 
    horacita: {
     type: String,
     required:true

    },
    estadocita: {
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
     doctor :{
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required:true 
    },



 },{ collection: 'citas'});

 CitaSchema.method('toJSON', function() {

    const { __v, ...object} = this.Object();

    return object;


 })

 module.exports = model('Cita', CitaSchema);
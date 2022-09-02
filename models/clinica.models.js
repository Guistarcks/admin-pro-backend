const {Schema, model} = require ('mongoose');

const ClinicaSchema = Schema({
  
    nombre:{
       type:String,
       required:true 
    },
       img:{
        type: String,
    },
    usuario :{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true 

    }
},{ collection: 'clinicas'});
// ESTA FUNCIÓN EXTRAE DEL OBJETO LA INFORMACIÓN QUE DESEA QUE NO SEA VISIBLE.OJO
ClinicaSchema.method('toJSON', function() {
    //>
    const { __v, ...object} = this.toObject();
    //*******================> */
    return object;

})

module.exports = model('Clinica', ClinicaSchema );
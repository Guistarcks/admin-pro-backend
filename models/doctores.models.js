const { Schema, model} = require ('mongoose');

const DoctoreSchema = Schema({
  
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
    },
    clinica :{
        type: Schema.Types.ObjectId,
        ref: 'Clinica',
        required:true 
    },

});
// ESTA FUNCIÓN EXTRAE DEL OBJETO LA INFORMACIÓN QUE DESEA QUE NO SEA VISIBLE.OJO
DoctoreSchema.method('toJSON', function() {
    //>
    const { __v, ...object} = this.toObject();
    //*******================> */
    return object;

})

module.exports = model('Doctores', DoctoreSchema );
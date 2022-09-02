
const { response } = require ('express');
const Clinicas = require ('../models/clinica.models');

const getClinicas = async (req, res = response) =>{


 const clinicas = await Clinicas.find()
                               .populate('usuario','nombre img')
                                
 res.json({
  ok:true,
  clinicas

 });

}

const crearClinicas =  async (req, res = response) =>{
   
    const uid = req.uid;
    const clinicas = new Clinicas( { 
    usuario: uid, ...req.body
        
    });
    
    
   try {

    const clinicaDB =  await clinicas.save();


    res.json({
        ok:true,
        clinica:clinicaDB
              
       });

       
   } catch (error) {
       console.log(error);
       res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
       });
   }
   
   }
   const actualizarClinicas = async (req, res = response) =>{
   
    const idClinica = req.params.id;
    const uid = req.uid;
     try {
         
          const clinica = await Clinicas.findById( idClinica );
         
          if(! clinica ){
            return res.status( 404 ).json({
                ok:true,
                msg: 'Clinica no encontrada por id',
                
               });
          }
       
       const cambiosClinicas ={  ...req.body, usuario: uid }
       
       const clinicaActualizada = await Clinicas.findByIdAndUpdate(idClinica, cambiosClinicas, {new:true} )


       res.json({
       ok:true,
        clinica: clinicaActualizada
       });
      

     } catch (error) {
       console.log( error );
        res.status(500).json({
         
           ok:false,
           msg:'Hable con el administrador'

        });
        
     }
   }

   const borrarClinicas = async (req, res = response) =>{
  
    const idClinica = req.params.id;
  
     try {
         
          const clinica = await Clinicas.findById( idClinica );
         
          if(! clinica ){
            return res.status( 404 ).json({
                ok:true,
                msg: 'Clinica no encontrada por id',
                
               });
          }
       
        await Clinicas.findByIdAndDelete( idClinica );
     
       res.json({
       ok:true,
       msg:'Clinica elimininada con éxito'
       });
      

     } catch (error) {
       console.log( error );
        res.status(500).json({
         
           ok:false,
           msg:'Hable con el administrador'

        });
        
     }
  
  
  
   
   }

   //const getClinicas = async (req, res ) => {

    //const desde = Number (req.query.desde) || 0;
    
    //const [clinicas, total ] = await Promise.all([
       // Clinicas
              // .find({},'usuario','nombre img')
             //  .skip( desde )
                
               //ESTE PUNTO PUBLICAMOS LA CANTIDAD DE DATOS A MOSTRAR   
               //  .limit( 5 ),
               //  Clinicas.count(),
   
   // ]);
                                  
                                    
    // res.json({
     // ok:true,
     // clinicas,
     // total
    // });
    
   // }

module.exports = {
    getClinicas,
    crearClinicas,
    actualizarClinicas,
    borrarClinicas
}




const { response } = require ('express');

const Cliente = require ('../models/clientes.models');


const getClientes = async (req, res = response) =>{


    const clientes = await Cliente.find()
                                  .populate('usuario','nombre img')
                                  .populate('clinica','nombre img')
                                                           
     res.json({
      ok:true,
      clientes
    
     })
    
       }


       
const getClientesById = async (req, res = response) =>{
        const id = req.params.id;
         try {
          
          const cliente = await Cliente.findById( id )
                                      .populate('usuario','nombre img')
                                      .populate('clinica','nombre img')
          res.json({
              ok:true,
              cliente
            
             })
      
         } catch (error) {
          res.json({
              ok:false,
              msg:'Hable con el administrador'
            
             })
            
          
         }
         
                                                                 
          
          }

const crearCliente = async (req, res = response) =>{

    const { email } = req.body;
    const existeEmail = await Cliente.findOne({email})
           
       try {  

       if(existeEmail){
        return res.status(500).json({
        ok:false,
        msg:'Este email ya existe. ¡Por favor intente con otro email!'
        });
       }
       const uid = req.uid;
       const cliente = new Cliente({usuario:uid,...req.body});    
       const clienteDB = await cliente.save();
       
       res.json({
            ok:true,
            cliente: clienteDB
          
           });
    
       } catch (error) {
        console.log(error);
           res.status(500).json({
               ok:false,
               msg:'Hable con el administrador'
           })
       }
          
       }
       
const actualizarClientes = async (req, res = response) =>{

        const idCliente = req.params.id;
        const uid = req.uid;
        try {
        
        const client = await Cliente.findById ( idCliente );
        
        if( !client ){
         return res.status ( 404 ).json({
          ok:true,
          msg:'Cliente no encontrado por id',
        
         });
        }
        
        const cambiosCliente ={ ... req.body, usuario: uid}
        const clienteActualizado = await Cliente.findByIdAndUpdate (idCliente, cambiosCliente, {new:true})
       
        res.json({
        ok: true,
        cliente: clienteActualizado})
          
        } catch ( error ) {
           console.log(error)
      
        res.status( 500 ).json({
        
        ok:false,
        msg:'Hable con el administrador'
        
        });
        
        }
         
    }
    
const borrarClientes = async (req, res = response) =>{
   
        const idCliente = req.params.id;
        try {
            
        const cliente = await Cliente.findById ( idCliente );
    
        if(! cliente ){
         return res.status ( 404 ).json({
         ok:true, 
         msg:'Cliente no encotrado por id'
    
         });
        }
    
        await Cliente.findByIdAndDelete( idCliente);
        res.json({
            ok:true,
            msg: 'Cliente Borrado con éxito'
          
           });
    
        } catch (error) {
            console.log( error );
           res.status( 500 ).json({
           ok:false,
           msg:'Hable con el administrador '
    
           });
        }
         
       
       }


module.exports = {
getClientes,
crearCliente,
actualizarClientes,
getClientesById,
borrarClientes
 
 
}
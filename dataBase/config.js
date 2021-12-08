const mongoose = require('mongoose');


const dbConnection = async () =>{
  

    try {
        
        await  mongoose.connect(process.env.DB_CNN, {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser: true

          });
          console.log('DB ON-LINE :)');

    } catch (error) {

        console.log(error);
        throw new Error ('Error a la hora de inciar la BD ver logs');
        
    }


}
module.exports = {
    dbConnection
}
 
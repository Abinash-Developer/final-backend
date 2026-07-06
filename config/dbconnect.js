const mongoose = require('mongoose');
const dbconnect = async () => {
try{
   await mongoose.connect(`mongodb+srv://appskaswebtech_db_user:Abinash7077@cluster0.ius7lms.mongodb.net/finallearn`);
   console.log('Database connected successfully');
}catch(err){
    console.log(err);
}
}
module.exports = dbconnect;
const mongoose = require('mongoose');
const dbconnect = async () => {
try{
   await mongoose.connect(process.env.DATABASEURL);
   console.log('Database connected successfully');
}catch(err){
    console.log(err);
}
}
module.exports = dbconnect;
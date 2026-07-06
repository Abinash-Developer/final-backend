const bycrypt = require('bcryptjs');
const getBycryptpassword = async (password) => {
    try{
        const salt = await bycrypt.genSalt(10);
        const hashpassword = await bycrypt.hash(password,salt);
        return hashpassword;
    }catch(err){
        console.error('Error hashing password:', err);
        throw err;
    }
}
module.exports = {getBycryptpassword};
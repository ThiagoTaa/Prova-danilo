const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')


//definindo collections
module.exports = function(){
    const userSchema = mongoose.Schema({
        nome: {type: String, trim: true},
        email: {type: String, trim: true, unique: true, index: true},
        password: {type: String},
        dt_cadastro: {type: Date, default: Date.now}
    });

    userSchema.methods.generateHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)
    }
    userSchema.methods.validPassword = function(password, old_password){
		return bcrypt.compareSync(password, old_password, null);
	}
    return mongoose.model('Usuarios', userSchema)

}
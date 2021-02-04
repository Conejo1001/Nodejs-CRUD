const bcrypt = require('bcryptjs');

const helpers = {};

//Método para encriptar la contraseña
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) //Cidrado, a mas ejecuciones más seguridad
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

//Crear logueo, compara la contraseña introducida en la base
helpers.matchPassword = async (password,savedPassword) => {
    try {
        return await bcrypt.compare(password,savedPassword);
    } catch(e) {
        console.log(e);
    }
};

module.exports = helpers;
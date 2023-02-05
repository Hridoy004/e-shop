const saltRounds = 10;

const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
};

module.exports = hashPassword;
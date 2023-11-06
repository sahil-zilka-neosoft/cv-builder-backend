const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const token  = jwt.sign({id},process.env.SECRET,{
        expiresIn : "15d",
    });
    return token;
};

module.exports = generateToken;
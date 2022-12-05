var bcrypt = require("bcrypt");
require('dotenv').config()

let hash = process.env.PASSWORD

const checkPassword = async (pass) => {
    console.log(pass)
    return await bcrypt.compare(pass, hash).then(result => {
        console.log(result)
        return result
    })
}

module.exports  = {
    checkPassword
}
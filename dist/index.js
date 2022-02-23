const { expressDecrypt } = require("./dto/body-decrypt");
const { expressEncrypt } = require("./dto/body-encrypt");

const moduleExports = {
    expressEncryption: expressEncrypt,
    expressDecryption: expressDecrypt,
};

module.exports.moduleExports = moduleExports;

const axios = require("axios");
const { enCrypt } = require("../util/aes");

function ExpressBodyDecrypt(ip, port, path) {
    this.ip = ip;
    this.port = port;
    this.path = path;
}

ExpressBodyDecrypt.prototype.getKey = async function () {
    try {
        let encrypt = await axios.get(`http://${this.ip}:${this.port}${this.path}`);
        let key = encrypt.data.key;
        return key;
    } catch (err) {
        throw new Error(err);
    }
};

ExpressBodyDecrypt.prototype.encrypt = enCrypt;

ExpressBodyDecrypt.prototype.encryptPost = async function (url, body) {
    try {
        let key = await this.getKey();
        let encryptBody = {
            data: this.encrypt(body, key),
        };

        let result = await axios.post(url, encryptBody);
        return result.data;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.expressDecrypt = function (ip, port, path) {
    let decrypt = new ExpressBodyDecrypt(ip, port, path);
    return decrypt;
};

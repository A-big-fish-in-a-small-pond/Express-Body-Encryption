const { options, DEFAULT } = require("../const/const");
const { createKey, enCrypt, deCrypt } = require("../util/aes");
const { Session } = require("../vo/session");
const { DefaultStore } = require("../vo/store");

function ExpressBodyEncrypt() {
    this.session = new Session();
    this.enabled = true;
    this.key = null;
    this.path = null;
    this.accessPath = [];
    this.handler = null;
}

ExpressBodyEncrypt.prototype.setOptions = function (opt = options, store) {
    if (opt.store == DEFAULT || store == null) {
        this.session.setStore(new DefaultStore());
    } else {
        this.session.setStore(store);
    }

    this.enabled = opt.enabled;
    this.key = opt.key;
    this.path = opt.path;
    this.handler = opt.handler;
    this.accessPath = opt.accessPath;
};

ExpressBodyEncrypt.prototype.bodyEncryptionHandler = function (req, res, next) {
    if (security.enabled == true) {
        switch (req.method) {
            case "GET":
                let resultGET = security.requestMethodGET(req.path, req.ip);
                return resultGET == false ? next() : res.json({ key: resultGET });
            default:
                let resultPOST = security.requestMethodPOST(req);
                if (resultPOST == true) {
                    return next();
                } else {
                    if (security.handler != null) {
                        return this.handler(req, res, next);
                    } else {
                        return res.json({ error: "사용자의 불법적인 접근이 파악되었습니다." });
                    }
                }
        }
    } else {
        return next();
    }
};

ExpressBodyEncrypt.prototype.requestMethodPOST = function (req) {
    try {
        if (this.accessPath.length != 0) {
            if (this.accessPath.some(req.path) == false) {
                return true;
            }
        }

        let encryptIpv4 = enCrypt(req.ip, createKey(this.key));
        let sessionKey = this.session.getSession(encryptIpv4);

        if (sessionKey == null) {
            return false;
        } else {
            this.session.deleteSession(encryptIpv4);
        }

        let data = deCrypt(JSON.stringify(req.body), sessionKey);

        if (data != null) {
            req.body = JSON.parse(data);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

ExpressBodyEncrypt.prototype.requestMethodGET = function (path, ipv4) {
    try {
        if (path == this.path) {
            let timestamp = new Date().getTime().toString();
            let sessionKey = createKey(this.key + timestamp);
            let encryptIpv4 = enCrypt(ipv4, createKey(this.key));

            this.session.setSession(encryptIpv4, sessionKey);

            return sessionKey;
        } else {
            return false;
        }
    } catch {
        return false;
    }
};

const security = new ExpressBodyEncrypt();

module.exports.expressEncrypt = (options) => {
    security.setOptions(options);
    return security;
};

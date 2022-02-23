const express = require("express");
const { moduleExports } = require("../dist");
const app = express();

let options = {
    enabled: true /** 암호화를 시행하기 위해서는 명시해주어야 합니다. */,
    store: "default" /** 기본적인 키 저장은 메모리로부터 저장합니다. redis 를 따로 구현하셔도 됩니다. */,
    key: "abcdefghijklmnop" /** 암호화 키를 입력합니다. ipv4 의 암호화와 세션키를 암호화할 때 사용합니다. */,
    path: "/security" /** 세션키 발급을 위한 path 지정장소입니다. */,
    handler: null /** 세션키의 발급을 받지 않은채로 비인가 웹페이지로 접근할 경우 처리되는 핸들러입니다. */,
    accessPath: [] /** 암호화를 수행할 경로를 지정합니다. 경로를 지정하지 않을 경우 모든 post 메소드는 암호화처리를 수행합니다. */,
};

const security = moduleExports.expressEncryption(options);

/** middle ware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(security.bodyEncryptionHandler);

app.use("/", (req, res) => {
    setTimeout(() => {
        res.json({ ...req.body });
    }, 1);
});

app.listen(3000, "0.0.0.0", () => {
    console.log("server open");
});

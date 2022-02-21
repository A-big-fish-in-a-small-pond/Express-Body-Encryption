const { enCrypt } = require("../body-security/util/aes");

console.log(enCrypt("박종선입니다요", "6c4676ed82c6b13dbf189a29a9c306dd"));

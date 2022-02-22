const { moduleExports } = require("../body-security");
const expressDecrypt = moduleExports.expressDecryption("localhost", 3000, "/security");

let body = {
    data: "안녕하세요 김준호입니다.",
};

async function main() {
    let a = await expressDecrypt.encryptPost("http://localhost:3000/security", body);
    console.log(a);
}

main();

const { moduleExports } = require("../body-security");
const expressDecrypt = moduleExports.expressDecryption("localhost", 3000, "/security");

async function main() {
    let a = await expressDecrypt.encryptPost("http://localhost:3000/security", "안녕하세요 김준호입니다.");
    console.log(a);
}

main();

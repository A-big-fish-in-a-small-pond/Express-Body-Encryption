const express = require("express");
const { moduleExports } = require("./body-security");
const app = express();

let options = {
    enabled: true,
    store: "default",
    key: "abcdefghijklmnop",
    path: "/security",
    handler: null,
    accessPath: [],
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

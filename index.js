const express = require("express");
const app = express();

/** middle ware */
app.use(express.json());

app.use("/", (req, res) => {
    setTimeout(() => {
        res.json({ success: "end page" });
    }, 1);
});

app.listen(3000, "0.0.0.0", () => {
    console.log("server open");
});

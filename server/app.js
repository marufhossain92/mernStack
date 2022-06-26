const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config({path: './config.env'});
require("../server/db/conn");

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at Port number ${PORT}`);
});
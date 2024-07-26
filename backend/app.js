const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser  = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
// else{
//     require("dotenv").config({ path: "backend/config/config.env" });
// }

 

//Importing Route
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);
app.use("/api/v1",paymentRoute);

//To make backend and frontend run on backend port
// if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });
// }

//

const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);


module.exports = app;
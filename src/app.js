const express = require("express");
const connectDb = require("./config/db.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

//manage the routes
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("Database connection established......");
    app.listen(8080, () => {
      console.log("server is successfully listening on the port 8080!!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//https://www.npmjs.com/package/bcrypt
//https://expressjs.com/en/guide/routing.html

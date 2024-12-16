const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    // logic of db data and get user data
    throw new Error("a;SLKDJFVCMSLADN");
  } catch (error) {
    res.status(500).send("some erorr contact support team...");
  }
});

// below error should be the 1st parameter
app.use("/", (err, req, res, next) => {
  if (err) {
    //log your error
    res.status(500).send("something went wrong");
  }
});

app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});

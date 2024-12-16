const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose.connect(
    "mongodb+srv://LCouWaJvnFcv8y2H:LCouWaJvnFcv8y2H@namestenode.z5gmh.mongodb.net/devTinder"
  );
};

module.exports = connectDb;

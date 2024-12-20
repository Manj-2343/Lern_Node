const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: { values: ["ignored", "interested", "accepted", "rejected"] },
      message: `{values} is incorrect status type`,
    },
  },
  {
    timestamps: true,
  }
);
//compound index
//if i wrote the code ConnectionRequestModel.findOne the i should write in the  below type in my model i.e compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); //this 1 belongs to ascending order

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //check if the fromUserId as same as teh toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You Cannot sent connection request to yourself");
  }
  next();
}); //this middle ware for pre save

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;

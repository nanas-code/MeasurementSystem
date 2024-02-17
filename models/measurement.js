const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const measurementSchema = new Schema(
  {
    place: { type: String, required: true },
    date: { type: Date, 
      required: true,
      
    },
    value: {
      type: Number,
      required: true,
      validate: [
        (val) => val >= -500 && val <= 500,
        'Value must be between -500 and 500',
      ],
    },
    type: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Measurement = mongoose.model("Measurement", measurementSchema);
module.exports = Measurement;

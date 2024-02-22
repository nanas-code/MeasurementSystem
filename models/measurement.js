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
      min: [ -500,
        'Value must be greater than or equal to -500',
      ],
      max: 500
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

const { Schema, model } = require("mongoose");

const measurementSchema = new Schema(
  {
    place: { type: String, required: true },
    date: { type: Date, 
      default: Date.now,
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
);

const Measurement = model("Measurement", measurementSchema);
module.exports = Measurement;

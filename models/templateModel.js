const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  templateType: {
    type: String,
  },
});

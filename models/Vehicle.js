const { Schema, model } = require('mongoose');

// Schema to create a course model
const vehicle = new Schema(
  {
    name: {
      type: String,
    },
  }
);

const ship = model('course', courseSchema);

module.exports = Course;





const mongoose = require("mongoose");


const ProjectSchema = new mongoose.Schema({
    project : {
        type: String,
        required: [true, "Project is required"],
        minlength: [3, "Project must be 3 characters or longer"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"]
    },
    status : {
        type: String
    }
});

module.exports = mongoose.model("Project", ProjectSchema);
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String, 
        default: '123456'
    },
    mssv: { 
        type: String, 
        require: true, 
        unique: true
    }
    }, 
    
    
    { 
        timestamps: true // Enable createdAt and updatedAt fields
    }
);

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;

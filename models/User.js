const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
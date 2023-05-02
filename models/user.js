const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name : {
            type: String,
            required: true
        },
        mail : {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }

    }, {timestamps: true});

const User = mongoose.model('User', userSchema);
const UserRegister = mongoose.model('register', userSchema);
const UserPassword = mongoose.model('password', userSchema);
module.exports = {User, UserRegister, UserPassword};

const mongoose = require('mongoose');

const {Schema} = mongoose
 
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            required: true,
            unique: true
        },
        message: ""
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);
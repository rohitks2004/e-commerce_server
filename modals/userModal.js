const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    id:String,
    name: {
        type:String,
        required:[true,"name is required"]
    },
    email: {
        type:String,
        required:[true,"email is required"]
    },
    password: {
        type:String,
        required:[true,"password is required"]
    }
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('user',userSchema);
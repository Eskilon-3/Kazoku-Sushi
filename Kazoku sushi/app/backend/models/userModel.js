import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Digite o nome"]},
    email: {
        type: String, required: [true, "Digite o email"], index: true, unique: true,     
    },
    password: {type: String, required: [true, "Digite a senha"]},
    isAdmin: {type: Boolean, required: true, default: false},
});

const User = mongoose.model('User', userSchema);
export default User;
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo; 
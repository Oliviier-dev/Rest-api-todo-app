import mongoose, { Schema } from 'mongoose';

// Create todo Schema
const TodoSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Create and export Todo model
const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;
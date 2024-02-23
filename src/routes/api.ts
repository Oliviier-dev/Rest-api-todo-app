import express, { Request, Response, NextFunction } from 'express';
import Todo from '../models/todo';

const router = express.Router();

// Get a list of todos from the db
router.get('/todos', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find({});
        res.send(todos);
    } catch (err) {
        next(err);
    }
});

// Add a new todo to the db
router.post('/todos', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Todo.create(req.body);
        res.send(todo);
    } catch (err) {
        next(err);
    }
});

// Update a todo in the db
router.put('/todos/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const updatedTodo = await Todo.findOne({ _id: req.params.id });
        res.send(updatedTodo);
    } catch (err) {
        next(err);
    }
});

// Delete a todo from the db
router.delete('/todos/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id });
        res.send(deletedTodo);
    } catch (err) {
        next(err);
    }
});

export default router;
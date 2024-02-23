import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

// Set up express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/All-Todos');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// Use body-parser middleware
app.use(bodyParser.json());

// Initialize routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(err); // To see properties of message in our console
    res.status(422).send({ error: err.message });
});

// Listen for requests
app.listen(process.env.PORT || 4000, function() {
    console.log('Now listening for requests');
});
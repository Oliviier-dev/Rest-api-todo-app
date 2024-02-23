"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api"));
// Set up express app
const app = (0, express_1.default)();
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost/All-Todos');
mongoose_1.default.Promise = global.Promise;
app.use(express_1.default.static('public'));
// Use body-parser middleware
app.use(body_parser_1.default.json());
// Initialize routes
app.use('/api', api_1.default);
// Error handling middleware
app.use(function (err, req, res, next) {
    console.log(err); // To see properties of message in our console
    res.status(422).send({ error: err.message });
});
// Listen for requests
app.listen(process.env.PORT || 4000, function () {
    console.log('Now listening for requests');
});

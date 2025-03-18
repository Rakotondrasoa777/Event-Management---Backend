const express = require("express");
const cors = require("cors");
const eventController = require("./controllers/showEvent");
const userControlllers = require("./controllers/showUser");

const app = express();
const port = 1818

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/events', eventController.getAllEvent);
app.get('/events/:id', eventController.getEventById);
app.get('/events/date/:date', eventController.filterEventsByDate);


app.get('/users', userControlllers.getAllUser);


app.listen(port, () => {
    console.log(`Server is running in :  http://localhost:${port}`);
})


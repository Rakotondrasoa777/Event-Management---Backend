const express = require("express");
const cors = require("cors");
const eventController = require("./controllers/showEvent");
const userControlllers = require("./controllers/showUser");

const app = express();
const port = 3000

app.use(cors({
    origin: 'http://localhost:5173', // Autoriser uniquement ce domaine
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
}));

app.get('/events', eventController.getAllEvent);
app.get('/users', userControlllers.getAllUser);


app.listen(port, () => {
    console.log(`Server is running in :  http://localhost:${port}`);
})


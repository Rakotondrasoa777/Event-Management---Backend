const express = require("express");
const eventController = require("./controllers/showEvent");
const userControlllers = require("./controllers/showUser");

const app = express();
const port = 3000

app.get('/events', eventController.getAllEvent);
app.get('/users', userControlllers.getAllUser);

app.listen(port, () => {
    console.log(`Server is running in :  http://localhost:${port}`);
})


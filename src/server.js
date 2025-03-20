const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 1818

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use("/events", eventRoutes);

app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Server is running in :  http://localhost:${port}`);
})


const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const resrervationRoutes = require("./routes/reservationRoutes");

const app = express();
const port = 1818


app.use(cors())


const authRoutes = require("./routes/authRoutes");
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/events", eventRoutes);

app.use("/users", userRoutes);

app.use("/reservation", resrervationRoutes);

app.get("/", authRoutes, authMiddleware, (req, res) => {
    res.json({message: "Now, you can reserve events", user: req.users})
})

app.listen(port, () => {
    console.log(`Server is running in :  http://localhost:${port}`);
})
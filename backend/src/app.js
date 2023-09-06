require("./db/connection");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoute = require("./route/auth");
const data = require("./route/data");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//contact Routes
app.get("/", (req, res) => {
  res.status(200).send("api is Live ✌️");
});

app.use("/auth", authRoute);
app.use("/", data);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      message: "Invalid Authorization token or Authorization token not found",
    });
  } else {
    next(err);
  }
});

//port
const PORT = process.env.PORT || 8080;

//starting a server
app.listen(PORT, () => {
  console.log(`Server is connecting on port ${PORT}`);
});

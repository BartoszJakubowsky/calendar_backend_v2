require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;
const DB_LOGIN = process.env.DB_LOGIN;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const calendarRoutes = require("./routes/calendarRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require("body-parser");
//for websockets
const server = require("http").Server(app);
const websocket = require("./websockets/websockets");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

//for calendar update
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.static(path.join(__dirname, "build")));

const routesToPassWithoutJWT = [
  "/logowanie",
  "/password/submit",
  "/register/submit",
];
const getRoutesWithJWT = ["/calendar, data/all"];

const verifyJWT = (req, res, next) => {
  if (req.method === "GET" && !getRoutesWithJWT.includes(req.originalUrl)) {
    next();
    return;
  }

  if (routesToPassWithoutJWT.includes(req.originalUrl)) {
    next();
    return;
  }

  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({ auth: false, message: "Failed to authenticate" });
    return;
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ auth: false, message: "Failed to authenticate" });
      return;
    }

    next();
  });
};

const dbURI = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@calendar.va1iidg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((resault) => {
    console.log("database connected correctly");
  })
  .catch((err) => {
    console.log("error while connecting to database", err);
  });

app.use(authRoutes);
app.use("/calendar", calendarRoutes);
app.use(verifyJWT);
// app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

websocket(io);
server.listen(process.env.PORT || 3000, () =>
  console.log("server's up, port 3000 by default")
);

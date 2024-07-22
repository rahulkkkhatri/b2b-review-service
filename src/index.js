const express = require("express");
const bodyParse = require("body-parser");
const { databaseConnection } = require('./database');
const { reviewRoutes } = require('./routes/api/v1');
const mongoose = require("mongoose");

const { PORT, CONTEXT_PATH } = require('./config');
const app = express();
const cors  = require('cors');
const errorHandler = require("./utils/error-handler");
const { currentUser } = require("./middlewares/current-user");
const { requireAuth } = require("./middlewares/require-auth");


// Middleware
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cors());

// app.use(logger);
// app.use(errorLogger);

// Db connection
databaseConnection();
console.log(CONTEXT_PATH)
// Routes
app.get(CONTEXT_PATH + "/health-check", (req, res) => {
    return res.status(200).json({
      message: `Server healthy at ${PORT}`,
    });
});

app.use(currentUser);
app.use(requireAuth);
app.use(CONTEXT_PATH + "/v1/review", reviewRoutes);

app.use(errorHandler);

// Server
app.listen(PORT, () => {
  console.log(`Server up and running at ${PORT}`);
});


// Close mongoose connection on crash
process.on("beforeExit", (code) => {
    mongoose.connection.close();
  });
  
  process.on("SIGTERM", (signal) => {
    mongoose.connection.close();
    process.exit(0);
  });
  
  process.on("uncaughtException", (err) => {
    mongoose.connection.close();
    process.exit(1);
  });

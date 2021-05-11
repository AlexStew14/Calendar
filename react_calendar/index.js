const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

db = "mongodb://127.0.0.1:27017";

// Connect to the database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected succesfully`))
  .catch((err) => console.log(err));

// mongoose promise is deprecated
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

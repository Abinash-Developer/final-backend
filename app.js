const express = require("express");
const app = express();
const dbconnect = require("./config/dbconnect");

dbconnect();
app.use(express.json());
app.use("/api/user", require("./routes/user"));

app.use((err, req, res, next) => {
  console.error(err.stack); 

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});
app.listen(3432, () => {
  console.log("Server is running on port 3432");
});

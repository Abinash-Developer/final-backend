const express = require("express");
const app = express();
const dbconnect = require("./config/dbconnect");
const cors = require("cors");

dbconnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", require("./routes/user"));
app.use("/api/product", require("./routes/product"));
app.use("/uploads", express.static("uploads"));
app.get('/',(req,res)=>{
  res.json({message:"working great"})
})

app.use((err, req, res, next) => {
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

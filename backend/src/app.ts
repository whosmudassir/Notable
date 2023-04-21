import "dotenv/config";
import express from "express";

const app = express();

//end point
app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;

import express from "express";
const app = express();
const port = 5000;

//end point
app.get("/", (req, res) => {
  res.send("Hello world");
});

//starts a server
app.listen(port, () => {
  console.log("Server running on port : " + port);
});

// secure password
// Mz8DFu3iMgOKTZsk

// mongodb+srv://deadsoulartist:<password>@cluster0.9yirpqc.mongodb.net/?retryWrites=true&w=majority

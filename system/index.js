const app = require("./server.js");
const express = require("express");
const path = require("path");

app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api", require("./api"));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist/index.html"))
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`System running on port ${port}`));

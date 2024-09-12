const express = require('express');
const router = require("./route");
const app = express();
const port = 3000;

// route set up
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
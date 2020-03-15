const express = require("express");
const cors    = require("cors");
const cookies = require("cookie-parser");
const port    = 8000;
const db_name = "projectDB";
const app     = express();

app.use( cors({
  credentials: true, 
  origin: 'http://localhost:3000'
}));
app.use( express.json() );
app.use( cookies() );

require("./config/mongoose")(db_name);
require("./routes")(app);

app.listen(
  port, 
  () => console.log(`Listening on port ${port}`)
);
const express = require('express');
const app = express();
const db = require('./server/helper/db');

app.use(express.json());

db.getInstace();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
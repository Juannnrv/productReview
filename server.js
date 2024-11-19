const express = require("express");
const app = express();
const db = require("./server/helper/db");
const authRouter = require("./server/router/authRouter");
const { errorHandler } = require("./server/middleware/errorHandler");
const SessionService = require("./server/middleware/sessionConfig");

app.use(express.json());

db.getInstace();
SessionService.initializeSession(app);

app.use("/auth", authRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

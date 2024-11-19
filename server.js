const express = require("express");
const app = express();
const db = require("./server/helper/db");
const { errorHandler } = require("./server/middleware/errorHandler");
const SessionService = require("./server/middleware/sessionConfig");
const verifyJwt = require("./server/middleware/authJwt");
const authRouter = require("./server/router/authRouter");
const productRouter = require("./server/router/productRouter");
const reviewRouter = require("./server/router/reviewRouter");

app.use(express.json());

db.getInstace();
SessionService.initializeSession(app);

app.use("/auth", authRouter);
app.use(verifyJwt);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

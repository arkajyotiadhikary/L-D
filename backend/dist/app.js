import express from 'express';
// Routes
import userRouter from "./routes/user.route.js";
const app = express();
app.use('/', userRouter);
export default app;

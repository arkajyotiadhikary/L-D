import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
dotenv.config();
connectDB();
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is runnig at http://localhost:${port}`);
});

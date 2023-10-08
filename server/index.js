import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log('Database connected'))
	.catch((error) => console.log(error));

const app = express();

const port = 4000;

app.listen(port, () => {
	console.log(`Express server running at port ${port}`);
});

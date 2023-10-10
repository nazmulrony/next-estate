import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log('Database connected'))
	.catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(cors());

const port = 4000;

app.listen(port, () => {
	console.log(`Express server running at port ${port}`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal server error';

	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

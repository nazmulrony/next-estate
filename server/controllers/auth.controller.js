import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

//sign up controller
export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);// similar to await bcrypt.hash(password, 10)


	const newUser = new User({ username, email, password: hashedPassword });

	try {
		await newUser.save();
		res.status(201).json('User created successfully');
	} catch (error) {
		next(error);
	}
};

//sign in controller
export const signin = async (req, res, next) => {
	const { email, password } = req.body

	try {
		//email check
		const validUser = await User.findOne({ email })
		if (!validUser) {
			return next(errorHandler(404, 'User not found!'))
		}
		//password check
		const validPassword = bcrypt.compareSync(password, validUser?.password)
		if (!validPassword) {
			return next(errorHandler(401, 'Wrong credentials!'))
		}

	} catch (error) {
		next(error)
	}
}

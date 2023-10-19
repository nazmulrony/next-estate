import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import tokenService from "../service/token.service.js";

//sign up controller
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // similar to await bcrypt.hash(password, 10)

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
};

//sign in controller
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        //email check
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found!"));
        }
        //password check
        const validPassword = bcrypt.compareSync(password, validUser?.password);
        if (!validPassword) {
            return next(errorHandler(401, "Wrong credentials!"));
        }
        // const token = jwt.sign({ id: validUser?._id }, process.env.JWT_SECRET);
        const token = tokenService.loginToken({ _id: validUser._id }, "30d");

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(validUser);
    } catch (error) {
        next(error);
    }
};

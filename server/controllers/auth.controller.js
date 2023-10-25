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
        //loginToken function generated token using JWT
        const token = tokenService.loginToken({ _id: validUser._id }, "30d");

        const { password: pass, ...rest } = validUser?._doc;

        // res.cookie("access_token", token, { httpOnly: true })
        //     .status(200)
        //     .json(rest);

        res.status(200).json({ ...rest, token });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const google = async (req, res, next) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const { password, ...rest } = user._doc;
            const token = tokenService.loginToken({ _id: user._id }, "30d");
            //sending the user with a generated token
            res.status(200).json({ ...rest, token });
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = tokenService.loginToken({ _id: newUser._id }, "30d");
            const { password, ...rest } = newUser._doc;

            // sending the user with a generated token and without hashed password
            res.status(200).json({ ...rest, token });
        }
    } catch (error) {
        next(error);
    }
};

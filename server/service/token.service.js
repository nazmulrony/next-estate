import jwt from "jsonwebtoken";

const generateToken = (payload, expiresIn) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

    return token;
};
const loginToken = (payload, expiresIn) => {
    const token = generateToken(payload, expiresIn);

    return token;
};
const tokenService = { generateToken, loginToken };

export default tokenService;

import User from '../models/user.js';
import { generateAccessToken } from "../utils/jwtHelper.js"
import dotenv from "dotenv";
import { createHash, match } from "../utils/helper.js"

dotenv.config();

class AuthController {

    //user registration
    registerUser = async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashPassword = await createHash(password);
            console.log({ username, hashPassword });
            const user = await User.create({ username, password: hashPassword });
            res.status(200).json({ message: 'User created successfully.', user });
        } catch (error) {
            res.status(500).json({ message: 'registration error', error });
        }
    };

    //user login
    loginUser = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } })
            if (!user) {
                return res.status(404).json({ message: 'User not found.' })
            }
            const passwordMatch = await match(user.password, password) //database password, new enterned password
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials.' })
            }
            const accessToken = await generateAccessToken(user.id)
            res.status(200).json({ message: 'Logged in successfully.', accessToken })
        } catch (error) {
            res.status(500).json({ message: 'Login error', error });
        }
    }
}
export default new AuthController();
import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
	const { email, password, username, name, graduationyear, branch, resume, currentCompany, role } = req.body;

	try {
		const existingUser = await user.findOne({ email });

		if (existingUser) return res.status(400).json({ message: "User already exists" });

		const hashedPassord = await bcrypt.hash(password, 8);

		const result = await user.create({ username, email, password: hashedPassord, name, YOP: graduationyear, branch, resume, currentCompany, role });

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	const pass = password;

	try {
		const existingUser = await user.findOne({ email });

		if (!existingUser) return res.status(404).json({ message: "User does not exist" });

		const isPasswordCorrect = await bcrypt.compare(pass, existingUser.password);

		if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials" });

		const token = jwt.sign({ user: existingUser }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

		const { password, ...others } = existingUser._doc;

		res.cookie("accessToken", token, {
			httpOnly: true,
		});
		res.status(200).json(others);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const logout = (req, res) => {
	res.clearCookie("accessToken", {
		secure: true,
		sameSite: "none",
	})
		.status(200)
		.json({ message: "logged out" });
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async (req, res, next) => {
	let accessToken = undefined;
	req.headers.cookie
		? (accessToken = req.headers.cookie
				.split("; ")
				.find((row) => row.startsWith("accessToken="))
				.split("=")[1])
		: undefined;
	if (!accessToken) {
		res.status(401).send("Access Token Expired, Please Login Again");
	} else {
		try {
			const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET);
			const newAccessToken = jwt.sign({ user: decoded.user }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
			req.user = decoded.user;
			res.cookie("accessToken", newAccessToken, { httpOnly: true });
			next();
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	}
};

export default verifyToken;

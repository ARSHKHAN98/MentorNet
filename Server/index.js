import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/request.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/requests", requestRoutes);

mongoose
	.connect("mongodb+srv://ARSHKHAN98:Arshkhan98@cluster0.gesm3fj.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("SUCCESS"))
	.catch((error) => console.log(error.message));

app.listen(8800, () => console.log(`Server running on port: 8800`));

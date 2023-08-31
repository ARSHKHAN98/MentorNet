import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	profilepic: {
		type: String,
		// default:null
	},
	linkedin: {
		type: String,
	},
	github: {
		type: String,
	},
	applied: [
		{
			type: String,
		},
	],
	resume: {
		type: String,
	},
	YOP: {
		type: Number,
	},
	branch: {
		type: String,
	},
	role: {
		type: String,
	},
	currentCompany: {
		type: String,
	},
	timestamps: Date,
});
export default mongoose.model("User", userSchema);

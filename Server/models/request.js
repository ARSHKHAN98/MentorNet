import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
	createdat: {
		type: Date,
	},
	senderID: {
		type: String,
		required: true,
	},
	receiverID: {
		type: String,
		required: true,
	},
	postID: {
		type: String,
		required: true,
	},
	resume: {
		type: String,
		required: true,
	},
	YOP: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		default: "Pending",
	},
});
export default mongoose.model("Request", requestSchema);

import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	createdat: {
		type: Date,
	},
	userID: {
		type: String,
	},
	desc: {
		type: String,
	},
	companyname: {
		type: String,
	},
	role: {
		type: String,
	},
});
export default mongoose.model("Post", postSchema);

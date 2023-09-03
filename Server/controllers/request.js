import request from "../models/request.js";
import user from "../models/user.js";

export const getRequest = async (req, res) => {
	try {
		const requests = await request.find();
		res.status(200).json(requests);
	} catch (er) {
		res.status(500).json({ message: er.message });
	}
};

export const updateRequest = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedRequest = await request.findByIdAndUpdate(id, { status: req.body.status }, { new: true });
		res.status(200).json(updatedRequest);
	} catch (er) {
		res.status(500).json({ message: er.message });
	}
};

export const createRequest = async (req, res) => {
	const { _id } = req.user;
	const { user: u } = req;
	const { receiverID, postID } = req.body;
	try {
		const findExisting = await request.findOne({ senderID: _id, receiverID, postID, status: "Pending" });
		if (findExisting) {
			res.status(400).send("Already Requested");
		} else {
			const newRequest = await request.create({ senderID: _id, receiverID, postID, resume: u.resume, YOP: u.YOP });
			const requestingUser = await user.findOne({ _id });
			requestingUser.applied.push(postID);
			requestingUser.save();
			res.status(200).send({ newRequest });
		}
	} catch (er) {
		console.log(er.message);
		res.status(500).json({ message: er.message });
	}
};

export const deleteRequest = async (req, res) => {
	const { id } = req.params;
	try {
		await request.findByIdAndDelete(id);
		res.status(200).json("Deleted");
	} catch (er) {
		res.status(500).json({ message: er.message });
	}
};

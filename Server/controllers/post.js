import post from "../models/posts.js";

export const getPost = async (req, res) => {
	try {
		const allPosts = await post.find().sort({ createdat: -1 });
		res.status(200).json(allPosts);
	} catch (er) {
		console.log(er);
	}
};

export const createPost = async (req, res) => {
	const { desc, companyname, role } = req.body;
	const { user } = req;
	const newPost = new post({ desc, companyname, userID: user._id, createdat: new Date(), role });
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(501).json({ message: error.message });
	}
};

export const getOnePost = async (req, res) => {
	const { id } = req.params;
	try {
		const postt = await post.findById(id);
		res.status(200).send(postt);
	} catch (err) {
		console.log(err.message);
		res.status(500).send({ message: err.message });
	}
};

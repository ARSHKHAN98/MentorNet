import Post from "../post/Post";
import "./posts.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Posts = (userID) => {
	const [posts, setPosts] = useState([]);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const fun = async () => {
			const res = await axios.get("http://localhost:8800/api/posts", { withCredentials: true });
			setPosts(res.data);
		};
		fun();
	}, []);

	return <div className="posts">{userID.userID ? posts.map((post) => post.userID === userID.userID && <Post key={post._id} post={post} />) : posts.map((post) => post.userID !== user._id && <Post key={post._id} post={post} />)}</div>;
};

export default Posts;

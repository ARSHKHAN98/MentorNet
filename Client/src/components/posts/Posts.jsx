import Post from "../post/Post";
import "./posts.scss";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { PostContext } from "../../context/postContext";

const Posts = ({ userID }) => {
	const { posts, setPosts } = useContext(PostContext);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const fun = async () => {
			const res = await axios.get("http://localhost:8800/api/posts", { withCredentials: true });
			setPosts(res.data);
			setPosts(posts.filter((post) => !user.applied.includes(post._id)));
		};
		fun();
	}, []);

	return <div className="posts">{userID ? posts.map((post) => post.userID === userID && user.applied.includes(post._id) && <Post key={post._id} post={post} />) : posts.map((post) => post.userID !== user._id && <Post key={post._id} post={post} />)}</div>;
};

export default Posts;

import "./post.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../store/authSlice";

const Post = ({ post }) => {
	const [profilepic, setProfilepic] = useState();
	const { posts, setPosts } = useContext(PostContext);
	const { user } = useSelector((state) => state.auth);
	// const dispatch = useDispatch();

	useEffect(() => {
		const fun = async () => {
			const newuser = await axios.post("http://localhost:8800/api/users/find/" + post.userID, { userID: post.userID }, { withCredentials: true });
			setProfilepic(newuser.data.profilepic);
		};
		fun();
	}, []);

	const handleApply = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8800/api/requests", { receiverID: post.userID, postID: post._id }, { withCredentials: true });
			// setUser()
			setPosts(posts.filter((pt) => pt._id !== post._id));
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="post">
			<div className="container">
				<div className="header">
					<div className="left">
						<Link to={`/profile/${post.userID}`}>
							<img className="image" src={profilepic} alt=""></img>
						</Link>
						<div className="info">
							<div className="role">{post.role}</div>
							<div className="company"> {post.companyname}</div>
						</div>
					</div>
					<div className="right">
						{user._id !== post.userID && (
							<button className="button" onClick={handleApply}>
								Apply
							</button>
						)}
					</div>
				</div>
				<div className="body">
					<div className="bheader"> Job Description:</div>
					<div className="desc">{post.desc}</div>
				</div>
			</div>
		</div>
	);
};

export default Post;

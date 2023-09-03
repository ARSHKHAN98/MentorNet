import React, { useEffect, useState } from "react";
import "./referral.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Request = (request) => {
	const [profilepic, setProfilepic] = useState();
	const { user } = useSelector((state) => state.auth);
	const [sender, setSender] = useState({
		name: "",
		graduationyear: new Date().getFullYear(),
		branch: "",
		resume: "",
	});

	const [post, setPost] = useState({
		companyname: "",
		role: "",
		desc: "",
	});

	useEffect(() => {
		const fun = async () => {
			const userData = await axios.post("http://localhost:8800/api/users/find/" + request.request.receiverID, { userID: request.request.senderID }, { withCredentials: true });
			setProfilepic(userData.data.profilepic);
			setSender(userData.data);
			const postData = await axios.get("http://localhost:8800/api/posts/" + request.request.postID, { withCredentials: true });
			setPost(postData.data);
		};
		fun();
	}, []);

	return (
		<div className="wrapper">
			<div className="card">
				<div className="header">
					<Link to={`/profile/${request.request.senderID}`} className="left">
						<img src={profilepic} alt=""></img>
						<span className="name">{sender.name}</span>
					</Link>
					<div className="right">
						{(request.request.receiverID !== user._id && request.request.status) === "Accepted" && <div className="statusa">{request.request.status}</div>}
						{request.request.receiverID !== user._id && request.request.status === "Pending" && <div className="statusp">{request.request.status}</div>}
						{request.request.receiverID !== user._id && request.request.status === "Rejected" && <div className="statusr">{request.request.status}</div>}
					</div>
				</div>
				<div className="body">
					<div className="subbody">
						<div className="companyname">{post.companyname}</div>
						<div className="role">{post.role}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Request;

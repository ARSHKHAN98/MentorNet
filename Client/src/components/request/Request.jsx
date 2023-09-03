import React, { useEffect, useState } from "react";
import "./request.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Request = ({ request, handleChange }) => {
	const [profilepic, setProfilepic] = useState();
	const [sender, setSender] = useState({
		name: "",
		graduationyear: new Date().getFullYear(),
		branch: "",
		resume: "",
	});

	useEffect(() => {
		const fun = async () => {
			const userData = await axios.post("http://localhost:8800/api/users/find/" + request.receiverID, { userID: request.senderID }, { withCredentials: true });
			setProfilepic(userData.data.profilepic);
			setSender(userData.data);
		};
		fun();
	}, []);

	const handleAccept = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8800/api/requests/" + request._id, { status: "Accepted" }, { withCredentials: true });
			handleChange(request._id);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleReject = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8800/api/requests/" + request._id, { status: "Rejected" }, { withCredentials: true });
			handleChange(request._id);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="wrapper">
			<div className="card">
				<div className="header">
					<Link to={`/profile/${request.senderID}`} className="left">
						<img src={profilepic} alt=""></img>
						<span className="name">{sender.name}</span>
					</Link>
				</div>

				<div className="body">
					<div className="resume">resume</div>
					<div className="buttons">
						<button className="accept" onClick={handleAccept}>
							Accept
						</button>
						<button className="reject" onClick={handleReject}>
							Reject
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Request;

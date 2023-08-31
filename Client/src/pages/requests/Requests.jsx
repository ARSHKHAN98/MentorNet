import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/profileCard/ProfileCard";
import Request from "../../components/request/Request";
import "./requests.scss";
import axios from "axios";
import { useSelector } from "react-redux";

const Requests = () => {
	const [requests, setRequests] = useState();
	const { user } = useSelector((state) => state.auth);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		const func = async () => {
			const req = await axios.get("http://localhost:8800/api/requests", { withCredentials: true });
			setRequests(req.data);
		};
		func();
	}, []);

	return (
		<div className="containerr">
			<div className="toggle">{!toggle ? <span onClick={() => setToggle(true)}>Referrals</span> : <span onClick={() => setToggle(false)}>Requests</span>}</div>
			<div className="body">
				<div className="requests">{requests && requests.map((request) => (toggle ? request.receiverID === user._id && <Request request={request} key={request._id} /> : request.receiverID !== user._id && <Request request={request} key={request._id} />))}</div>
			</div>
		</div>
	);
};

export default Requests;
